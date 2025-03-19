const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const db = require('../config/db');

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get('/', async (req, res) => {
    try {
        const [books] = await db.execute('SELECT * FROM books');
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/books/:id
// @desc    Get book by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const [books] = await db.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
        
        if (books.length === 0) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        res.json(books[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/books
// @desc    Add a new book
// @access  Private (Admin only)
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('book_number', 'Book number is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('total_copies', 'Total copies must be a number').isNumeric()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized to add books' });
    }

    const { name, book_number, author, total_copies, reviews } = req.body;

    try {
        // Check if book number already exists
        const [existingBook] = await db.execute('SELECT * FROM books WHERE book_number = ?', [book_number]);
        
        if (existingBook.length > 0) {
            return res.status(400).json({ msg: 'Book number already exists' });
        }

        const [result] = await db.execute(
            'INSERT INTO books (name, book_number, author, total_copies, available_copies, reviews) VALUES (?, ?, ?, ?, ?, ?)',
            [name, book_number, author, total_copies, total_copies, reviews || '']
        );

        const [newBook] = await db.execute('SELECT * FROM books WHERE id = ?', [result.insertId]);
        res.json(newBook[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/books/:id
// @desc    Update a book
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized to update books' });
    }

    const { name, author, reviews, total_copies } = req.body;

    try {
        const [book] = await db.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
        
        if (book.length === 0) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        await db.execute(
            'UPDATE books SET name = ?, author = ?, reviews = ?, total_copies = ? WHERE id = ?',
            [name || book[0].name, author || book[0].author, reviews || book[0].reviews, total_copies || book[0].total_copies, req.params.id]
        );

        const [updatedBook] = await db.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
        res.json(updatedBook[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/books/:id
// @desc    Delete a book
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized to delete books' });
    }

    try {
        const [book] = await db.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
        
        if (book.length === 0) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        await db.execute('DELETE FROM books WHERE id = ?', [req.params.id]);
        res.json({ msg: 'Book removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/books/:id/issue
// @desc    Issue a book to a user
// @access  Private
router.post('/:id/issue', auth, async (req, res) => {
    try {
        const [book] = await db.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
        
        if (book.length === 0) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        if (book[0].available_copies === 0) {
            return res.status(400).json({ msg: 'Book not available' });
        }

        const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [req.user.id]);

        if (user[0].books_issued >= 3) {
            return res.status(400).json({ msg: 'Maximum books already issued' });
        }

        await db.execute('START TRANSACTION');

        try {
            await db.execute(
                'INSERT INTO book_issues (user_id, book_id) VALUES (?, ?)',
                [req.user.id, req.params.id]
            );

            await db.execute(
                'UPDATE books SET available_copies = available_copies - 1 WHERE id = ?',
                [req.params.id]
            );

            await db.execute(
                'UPDATE users SET books_issued = books_issued + 1 WHERE id = ?',
                [req.user.id]
            );

            await db.execute('COMMIT');

            res.json({ msg: 'Book issued successfully' });
        } catch (err) {
            await db.execute('ROLLBACK');
            throw err;
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/books/:id/return
// @desc    Return a book
// @access  Private
router.post('/:id/return', auth, async (req, res) => {
    try {
        const [bookIssue] = await db.execute(
            'SELECT * FROM book_issues WHERE book_id = ? AND user_id = ? AND return_date IS NULL',
            [req.params.id, req.user.id]
        );

        if (bookIssue.length === 0) {
            return res.status(404).json({ msg: 'No active issue found for this book' });
        }

        await db.execute('START TRANSACTION');

        try {
            await db.execute(
                'UPDATE book_issues SET return_date = CURRENT_TIMESTAMP WHERE id = ?',
                [bookIssue[0].id]
            );

            await db.execute(
                'UPDATE books SET available_copies = available_copies + 1 WHERE id = ?',
                [req.params.id]
            );

            await db.execute(
                'UPDATE users SET books_issued = books_issued - 1 WHERE id = ?',
                [req.user.id]
            );

            await db.execute('COMMIT');

            res.json({ msg: 'Book returned successfully' });
        } catch (err) {
            await db.execute('ROLLBACK');
            throw err;
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router; 

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const auth = require('./middleware/auth')
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/users', require('./routes/users'));

// Test protected route
app.get('/api/protected-route', auth, (req, res) => {
    res.json({ msg: 'This is a protected route', user: req.user });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

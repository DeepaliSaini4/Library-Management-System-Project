const pool = require('./config/db'); // Correct path

async function testConnection() {
    try {
        const [rows] = await pool.query("SELECT 1 + 1 AS result");
        console.log("Database connected successfully! Test query result:", rows);
    } catch (err) {
        console.error("Database connection failed:", err);
    }
}

testConnection();


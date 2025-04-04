require('dotenv').config({ path: './backend/.env' }); // Ensure correct path

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
async function testDB() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connected to MySQL Database!');
        connection.release();
    } catch (error) {
        console.error('❌ MySQL Connection Failed:', error.message);
    }
}

testDB();

module.exports = pool;
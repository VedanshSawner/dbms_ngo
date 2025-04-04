const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

exports.registerUser = (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).send('All fields are required');
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        User.insertUser(username, hashedPassword, role, (err, results) => {
            if (err) {
                return res.status(500).send('Error creating user');
            }
            res.status(201).json({ id: results.insertId, username, role });
        });
    });
};

exports.loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [
      username,
      hashedPassword,
      role,
    ]);

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const db = require('../config/db');

const assignShift = (shift_id, user_id, callback) => {
    const query = 'INSERT INTO shift_assignments (shift_id, user_id) VALUES (?, ?)';
    db.query(query, [shift_id, user_id], callback);
};

const getVolunteersByShift = (shift_id, callback) => {
    const query = `
        SELECT u.id, u.username, u.role 
        FROM users u
        JOIN shift_assignments sa ON u.id = sa.user_id
        WHERE sa.shift_id = ?
    `;
    db.query(query, [shift_id], callback);
};

module.exports = { assignShift, getVolunteersByShift };

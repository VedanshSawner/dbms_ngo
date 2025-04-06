const db = require('../config/db');

const insertShift = (shift_date, start_time, end_time, task, location, callback) => {
    const query = `
        INSERT INTO shifts (shift_date, start_time, end_time, task, location)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [shift_date, start_time, end_time, task, location, user_id], callback);
};

const getAllShifts = (callback) => {
    const query = 'SELECT * FROM shifts';
    db.query(query, callback);
};

const assignVolunteerToShift = (shift_id, user_id, callback) => {
    const query = 'INSERT INTO shift_assignments (shift_id, user_id) VALUES (?, ?)';
    db.query(query, [shift_id, user_id], callback);
};

module.exports = { insertShift, getAllShifts, assignVolunteerToShift };

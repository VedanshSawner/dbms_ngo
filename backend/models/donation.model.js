const db = require('../config/db');

const insertDonation = (donor_name, email, amount, payment_method, user_id, transaction_id, callback) => {
    const query = `
        INSERT INTO donations (donor_name, email, amount, payment_method, user_id, transaction_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [donor_name, email, amount, payment_method, user_id, transaction_id], callback);
};

const getAllDonations = (callback) => {
    const query = 'SELECT * FROM donations';
    db.query(query, callback);
};

module.exports = { insertDonation, getAllDonations };

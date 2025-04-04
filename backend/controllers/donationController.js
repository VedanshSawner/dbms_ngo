const Donation = require('../models/donation.model.js');

// Get All Donations
exports.getDonations = (req, res) => {
    Donation.getAllDonations((err, results) => {
        if (err) return res.status(500).send('Error fetching donations');
        res.json(results);
    });
};

// Create Donation
exports.createDonation = (req, res) => {
    const { donor_name, email, amount, payment_method, user_id, transaction_id } = req.body;

    if (!donor_name || !email || !amount || !payment_method) {
        return res.status(400).send('All fields are required');
    }

    Donation.insertDonation(
        donor_name,
        email,
        amount,
        payment_method,
        user_id,
        transaction_id,
        (err, results) => {
            if (err) return res.status(500).send('Error adding donation');
            res.status(201).json({ id: results.insertId, donor_name, amount, payment_method });
        }
    );
};

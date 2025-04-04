const express = require('express');
const { getDonations, createDonation } = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/donations', protect, getDonations);
router.post('/donations', protect, authorize(['organizer']), createDonation);

module.exports = router;

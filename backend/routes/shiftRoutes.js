const express = require('express');
const { getShifts, createShift, assignVolunteer } = require('../controllers/shiftController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/shifts', protect, getShifts);
router.post('/shifts', protect, authorize(['organizer']), createShift);
router.post('/shifts/assign', protect, authorize(['organizer']), assignVolunteer);

module.exports = router;

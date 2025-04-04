const express = require('express');
const { getVolunteersByShift, assignShift } = require('../controllers/shiftAssignmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/shift-assignments/:shift_id', protect, getVolunteersByShift);
router.post('/shift-assignments', protect, authorize(['organizer']), assignShift);

module.exports = router;

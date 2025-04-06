const express = require('express');
const { getShifts, getAvailableShifts, getAllAssignedShifts, createShift, assignVolunteer } = require('../controllers/shiftController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/shifts', protect, getShifts);
router.post('/shifts', createShift);
router.post('/shifts/assign', assignVolunteer);
router.get('/shifts/available', getAvailableShifts);
router.get('/shifts/assigned/all', getAllAssignedShifts);

module.exports = router;

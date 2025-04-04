const express = require('express');
const router = express.Router();
const { verifyToken } = require('./auth');

// Mock shift data (const for immutability)
const shifts = [
  { id: 1, date: '2025-06-20', time: '09:00-12:00', location: 'Sri City', task: 'Cinema support', appliedUsers: [], assignedUsers: [] },
  { id: 2, date: '2025-04-21', time: '14:00-18:00', location: 'Jaipur', task: 'Bar', appliedUsers: [], assignedUsers: [] },
  { id: 3, date: '2025-05-22', time: '08:00-11:00', location: 'Pakistan', task: 'Information Desk', appliedUsers: [], assignedUsers: [] },
];

// Route to get all available shifts (protected route)
router.get('/', verifyToken, (req, res) => {
  res.json(shifts);
});

// Apply for a shift (protected route)
router.post('/apply', verifyToken, (req, res) => {
  const { shiftId } = req.body;
  const shift = shifts.find(s => s.id === shiftId);

  if (!shift) {
    return res.status(404).json({ message: 'Shift not found' });
  }

  // Check if the user has already applied for this shift
  if (shift.appliedUsers.includes(req.user.userId)) {
    return res.status(400).json({ message: 'You have already applied for this shift.' });
  }

  // Add the user to the applied users list
  shift.appliedUsers.push(req.user.userId);
  res.status(200).json({ message: 'Shift application successful.' });
});

// Route to get assigned shifts for the logged-in user
router.get('/assigned', verifyToken, (req, res) => {
  const userId = req.user.userId;
  const assignedShifts = shifts.filter(shift => shift.assignedUsers.includes(userId));
  res.json(assignedShifts);
});

router.post('/create', async (req, res) => {
  const { date, time, location, task } = req.body;

  if (!date || !time || !location || !task) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newShift = new Shift({ date, time, location, task });
    await newShift.save();
    res.status(201).json(newShift);
  } catch (error) {
    res.status(500).json({ message: 'Error creating shift', error });
  }
});

module.exports = router;

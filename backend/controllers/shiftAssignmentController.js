const ShiftAssignment = require('../models/shiftAssignment.model.js');

exports.getVolunteersByShift = (req, res) => {
    const { shift_id } = req.params;

    ShiftAssignment.getVolunteersByShift(shift_id, (err, results) => {
        if (err) return res.status(500).send('Error fetching volunteers');
        res.json(results);
    });
};

exports.assignShift = (req, res) => {
    const { shift_id, user_id } = req.body;

    if (!shift_id || !user_id) {
        return res.status(400).send('Shift ID and User ID required');
    }

    ShiftAssignment.assignShift(shift_id, user_id, (err, results) => {
        if (err) return res.status(500).send('Error assigning volunteer');
        res.status(201).json({ message: 'Volunteer assigned successfully' });
    });
};

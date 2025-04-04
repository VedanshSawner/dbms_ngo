const Shift = require('../models/shift.model.js');

exports.getShifts = (req, res) => {
    Shift.getAllShifts((err, results) => {
        if (err) return res.status(500).send('Error fetching shifts');
        res.json(results);
    });
};

exports.createShift = (req, res) => {
    const { shift_date, start_time, end_time, task, location, user_id } = req.body;

    if (!shift_date || !start_time || !end_time || !task || !location || !user_id) {
        return res.status(400).send('All fields are required');
    }

    Shift.insertShift(shift_date, start_time, end_time, task, location, user_id, (err, results) => {
        if (err) return res.status(500).send('Error creating shift');
        res.status(201).json({ id: results.insertId, shift_date, task, location });
    });
};

exports.assignVolunteer = (req, res) => {
    const { shift_id, user_id } = req.body;

    if (!shift_id || !user_id) {
        return res.status(400).send('Shift ID and User ID required');
    }

    Shift.assignVolunteerToShift(shift_id, user_id, (err, results) => {
        if (err) return res.status(500).send('Error assigning volunteer');
        res.status(201).json({ message: 'Volunteer assigned successfully' });
    });
};

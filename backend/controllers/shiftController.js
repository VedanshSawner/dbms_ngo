const Shift = require('../models/shift.model.js');
const pool = require('../config/db.js');
exports.getShifts = (req, res) => {
    Shift.getAllShifts((err, results) => {
        if (err) return res.status(500).send('Error fetching shifts');
        res.json(results);
    });
};

// exports.createShift = (req, res) => {
//     const { shift_date, start_time, end_time, task, location} = req.body;

//     if (!shift_date || !start_time || !end_time || !task || !location) {
//         return res.status(400).send('All fields are required');
//     }

//     Shift.insertShift(shift_date, start_time, end_time, task, location, (err, results) => {
//         if (err) return res.status(500).send('Error creating shift');
//         res.status(201).json({ id: results.insertId, shift_date, task, location });
//     });
// };

exports.createShift = async (req, res) => {
  const { shift_date, start_time, end_time, task, location } = req.body;

  if (!shift_date || !start_time || !end_time || !task || !location) {
      return res.status(400).send('All fields are required');
  }

  try {
      const [result] = await pool.query(
          `INSERT INTO shifts (shift_date, start_time, end_time, task, location) VALUES (?, ?, ?, ?, ?)`,
          [shift_date, start_time, end_time, task, location]
      );

      res.status(201).json({
          id: result.insertId,
          shift_date,
          start_time,
          end_time,
          task,
          location
      });
  } catch (err) {
      console.error('Error creating shift:', err);
      res.status(500).send('Error creating shift');
  }
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

exports.getAvailableShifts = async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT s.*
      FROM shifts s
      LEFT JOIN shift_assignments sa ON s.id = sa.shift_id
      WHERE sa.user_id IS NULL
        AND DATEDIFF(s.shift_date, CURDATE()) >= 5
    `);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching available shifts:', err);
    res.status(500).json({ message: 'Failed to fetch available shifts' });
  }
};

exports.getAllAssignedShifts = async (req, res) => {
  try {
    const [results] = await pool.query(`
SELECT 
  s.id AS shift_id,
  s.shift_date,
  s.start_time,
  s.end_time,
  s.task,
  s.location,
  u.id AS volunteer_id,
  u.username AS volunteer_name
FROM shifts s
INNER JOIN shift_assignments sa ON s.id = sa.shift_id
INNER JOIN users u ON sa.user_id = u.id
ORDER BY s.shift_date ASC;

    `);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching all assigned shifts:', err);
    res.status(500).json({ message: 'Failed to fetch assigned shifts' });
  }
};

  
const express = require('express');
const router = express.Router();
const weeksController = require('./controllers/WeeksController');

// Rutas para weeks
router.post('/weeks', weeksController.createWeek);
router.get('/weeks', weeksController.getWeeks);
router.get('/weeks/:id', weeksController.getWeekById);
router.put('/weeks/:id', weeksController.updateWeek);
router.delete('/weeks/:id', weeksController.deleteWeek);

module.exports = router;
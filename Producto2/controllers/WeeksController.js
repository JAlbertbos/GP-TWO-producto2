const Week = require("../../models/Week");

// Controlador para obtener todas las semanas
exports.getWeeks = (req, res) => {
  Week.find()
    .then(weeks => res.json(weeks))
    .catch(err => res.status(500).json({ error: err }));
};

// Controlador para obtener una semana por su ID
exports.getWeekById = (req, res) => {
  Week.findById(req.params.weekId)
    .then(week => res.json(week))
    .catch(err => res.status(500).json({ error: err }));
};

// Controlador para crear una nueva semana
exports.createWeek = (req, res) => {
  const newWeek = new Week(req.body);
  newWeek.save()
    .then(week => res.json(week))
    .catch(err => res.status(500).json({ error: err }));
};

// Controlador para actualizar una semana por su ID
exports.updateWeekById = (req, res) => {
  Week.findByIdAndUpdate(req.params.weekId, req.body, { new: true })
    .then(week => res.json(week))
    .catch(err => res.status(500).json({ error: err }));
};

// Controlador para eliminar una semana por su ID
exports.deleteWeekById = (req, res) => {
  Week.findByIdAndDelete(req.params.weekId)
    .then(() => res.json({ message: 'Week deleted successfully' }))
    .catch(err => res.status(500).json({ error: err }));
};

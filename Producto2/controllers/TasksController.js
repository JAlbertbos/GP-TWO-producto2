const Task = require("Producto2/models/Task");

// Controlador para obtener todas las tareas
exports.getTasks = (req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({ error: err }));
};

// Controlador para obtener una tarea por su ID
exports.getTaskById = (req, res) => {
  Task.findById(req.params.taskId)
    .then(task => res.json(task))
    .catch(err => res.status(500).json({ error: err }));
};

// Controlador para crear una nueva tarea
exports.createTask = (req, res) => {
  const newTask = new Task(req.body);
  newTask.save()
    .then(task => res.json(task))
    .catch(err => res.status(500).json({ error: err }));
};

// Controlador para actualizar una tarea por su ID
exports.updateTaskById = (req, res) => {
  Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
    .then(task => res.json(task))
    .catch(err => res.status(500).json({ error: err }));
};

// Controlador para eliminar una tarea por su ID
exports.deleteTaskById = (req, res) => {
  Task.findByIdAndDelete(req.params.taskId)
  .then(() => res.json({ message: 'Task deleted successfully' }))
  .catch(err => res.status(500).json({ error: err }));
};
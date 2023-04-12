const Task = require('../models/Task');

class TasksController {
  async getAll(req, res) {
    try {
      const tasks = await Task.find({});
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las tareas' });
    }
  }

  async create(req, res) {
    try {
      const newTask = new Task(req.body);
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la tarea' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Task.findByIdAndDelete(id);
      res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
  }
}

module.exports = new TasksController();
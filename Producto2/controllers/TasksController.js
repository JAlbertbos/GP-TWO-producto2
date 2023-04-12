// Agregar una nueva tarea
const taskData = {
  id_week: 1,
  name: 'Nueva tarea',
  startTime: '2022-04-18T08:00:00.000Z',
  endTime: '2022-04-18T09:00:00.000Z',
  description: 'Descripción de la nueva tarea',
  participants: 2,
  isCompleted: false
};

fetch('/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(taskData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Actualizar una tarea existente
const taskId = 1;
const updatedTaskData = {
  id_week: 1,
  name: 'Tarea actualizada',
  startTime: '2022-04-18T09:00:00.000Z',
  endTime: '2022-04-18T10:00:00.000Z',
  description: 'Descripción de la tarea actualizada',
  participants: 3,
  isCompleted: true
};

fetch(`/tasks/${taskId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedTaskData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Eliminar una tarea existente
fetch(`/tasks/${taskId}`, {
  method: 'DELETE',
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
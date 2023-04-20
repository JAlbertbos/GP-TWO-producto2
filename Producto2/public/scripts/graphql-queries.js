async function createWeek(name, week, priority, year, description, borderColor) {
  const mutation = `
  mutation {
    createWeek(input: {
      name: "${name}"
      week: ${week}
      priority: ${priority}
      year: ${year}
      description: "${description}"
      borderColor: "${borderColor}"
    }) {
      _id
      name
      week
      priority
      year
      description
      borderColor
    }
  }`;
  
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: mutation }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      return data.data.createWeek;
    } else {
      throw new Error(data.errors[0].message);
    }
  }
  export { createWeek };

  
  async function createTask(name, description, startTime, endTime, participants, location, weekId, day , completed = false) {
    if (typeof name !== 'string') {
      name = '';
      throw new Error('El campo "name" es obligatorio y no puede estar vacío.');
    }
    const trimmedName = name.trim();
    const mutation = `
    mutation {
      createTask(input: {
        name: "${name}"
        description: "${description}"
        startTime: "${startTime}"
        endTime: "${endTime}"
        participants: "${participants}"
        location: "${location}"
        weekId: "${weekId}"
        day: "${day}" // Agrega esta línea
        completed: ${completed}
      }) {
        _id
        name
        description
        startTime
        endTime
        participants
        location
        day // Agrega esta línea
        completed
      }
    }`;
  
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: mutation }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      return data.data.createTask;
    } else {
      throw new Error(data.errors[0].message);
    }
  }
  export { createTask };

  async function loadTasks() {
    const query = `
    query {
      tasks {
        _id
        name
        description
        startTime
        endTime
        participants
        location
        completed
        day       
      }
    }
  `;
  
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
  
    const { data } = await response.json();
    const tasks = data.tasks;
  
    tasks.forEach((task) => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('card', 'task');
      taskElement.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${task.name}</h5>
          <p class="card-text">${task.description}</p>
        </div>
      `;
      const dropzone = document.getElementById(task.day);
      dropzone.appendChild(taskElement);
    });
  }
  
  document.addEventListener('DOMContentLoaded', loadTasks);
  
  async function fetchTasks(weekId) {
    const query = `
    query {
      tasks(weekId: "${weekId}") {
        _id
        name
        description
        startTime
        endTime
        participants
        location
        completed
      }
    }`;
  
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: query }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      return data.data.tasks;
    } else {
      throw new Error(data.errors[0].message);
    }
  }
  export { fetchTasks };

  async function updateTaskDay(taskId, newDay) {
    const mutation = `
    mutation {
      updateTask(id: "${taskId}", input: { day: "${newDay}" }) {
        _id
        day
      }
    }`;
  
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: mutation }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      return data.data.updateTask;
    } else {
      throw new Error(data.errors[0].message);
    }
  }
  
  export { updateTaskDay };
  
  async function deleteWeek(weekId) {
    const mutation = `
    mutation {
      deleteWeek(id: "${weekId}") {
        _id
      }
    }`;
  
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: mutation }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      return data.data.deleteWeek;
    } else {
      throw new Error(data.errors[0].message);
    }
  }
  export { deleteWeek };
  
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
  
  async function createTask(name, description, startTime, endTime, participants, location, weekId, completed = false) {
    if (!name || name.trim() === '') {
      throw new Error('El campo "name" es obligatorio y no puede estar vacío.');
    }
  
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
        completed: ${completed}
      }) {
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
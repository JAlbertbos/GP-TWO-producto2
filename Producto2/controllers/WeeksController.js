const weekData = {
  name: 'Semana 1',
  number: 1,
  priority: 'Alta',
  year: 2022,
  colour: 'Rojo',
  description: 'Descripción de la semana 1',
};

fetch('/weeks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(weekData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

  const id = 1;
const updatedWeekData = {
  name: 'Semana actualizada',
  number: 1,
  priority: 'Baja',
  year: 2022,
  colour: 'Verde',
  description: 'Descripción de la semana actualizada',
};

fetch(`/weeks/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedWeekData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

//eliminar
  fetch(`/weeks/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  
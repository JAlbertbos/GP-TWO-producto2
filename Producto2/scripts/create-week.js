

document.getElementById('cardForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const week = document.getElementById('week').value;
  const priority = document.getElementById('priority').value;
  const year = document.getElementById('year').value;
  const description = document.getElementById('description').value;
  const color = window.selectedColor;

  const query = `
    mutation {
      createWeek(name: "${name}", week: ${week}, priority: "${priority}", year: ${year}, description: "${description}", color: "${color}") {
        id
        name
        week
        priority
        year
        description
        color
      }
    }
  `;

  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      console.error('Error en la respuesta GraphQL:', jsonResponse.errors);
      return;
    }


    const { data } = jsonResponse;
    
    const { id } = data.createWeek;

    const card = `
      <div class="card shadow-sm card-square" data-id="${id}" style="border-color: ${color}">
        <div class="card-body">
          <h5 class="card-title"><b>${name}</b></h5>
          <p class ="card-text">Semana: ${week}</p>
          <p class ="card-text">Prioridad: ${priority}</p>
          <p class ="card-text">Año: ${year}</p>
          <p class ="card-text">Descripcion: ${description}</p>
        </div>
        <div class="card-icons d-flex justify-content-between position-absolute bottom-0 start-0 end-0">
          <a href="/Producto1/Weektasks.html?weekId=${id}" class="card-link"><i class="bi bi-eye"></i></a>
          <a href="#" class="card-link delete-icon" data-id="${id}">
            <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#eliminarTarjetaModal" data-card="${id}"></i>
          </a>
        </div>
      </div>
    `;

    document.getElementById('cardsContainer').innerHTML += card;

    // Limpia el formulario
    document.getElementById('cardForm').reset();
    document.getElementById('nuevaSemanaModal').querySelector('.btn-close').click();

    // Agregar event listener para eliminar tarjeta
    const deleteIcon = document.querySelector(`.delete-icon[data-id="${id}"]`);
    deleteIcon.addEventListener('click', async (event) => {
      const cardId = event.target.dataset.card;
      const cardElement = document.querySelector(`.card[data-id="${cardId}"]`);

      // Eliminar tarjeta de la base de datos
      const deleteQuery = `
        mutation {
          deleteWeek(id: "${cardId}") {
            id
          }
        }
      `;

      await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: deleteQuery }),
      });

      // Eliminar tarjeta del DOM
      cardElement.remove();
    });
  } catch (error) {
    console.error('Error al crear la semana:', error);
  }
});

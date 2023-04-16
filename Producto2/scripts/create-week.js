document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmButton");
  const cardForm = document.getElementById("cardForm");

  async function fetchGraphQL(query, variables) {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });
    return await response.json();
  }

  function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }

  async function createCard(name, week, priority, year, description) {
    const query = `
      mutation CreateTask($title: String!, $description: String, $dueDate: String) {
        createTask(title: $title, description: $description, dueDate: $dueDate) {
          id
        }
      }
    `;

    const dueDate = new Date(year, 0, 1);
    dueDate.setDate(dueDate.getDate() + (week - 1) * 7);

    const variables = {
      title: name,
      description: description,
      dueDate: dueDate.toISOString(),
    };

    try {
      const result = await fetchGraphQL(query, variables);
      if (result.errors) {
        console.error(result.errors);
        mostrarModal("Ocurrió un error al guardar la tarea en el servidor.");
        return;
      }
      // Aquí necesitas obtener el ID generado por GraphQL en lugar de generar uno aleatorio
      const id = result.data.createTask.id;
      // Llama a la función addCardToDOM con el ID generado
      addCardToDOM(name, id, week, priority, year, description);
    } catch (error) {
      console.error(error);
      mostrarModal("Ocurrió un error al guardar la tarea en el servidor.");
      return;
    }
  }

  function addCardToDOM(name, id, week, priority, year, description) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("col-md-4", "mb-4");

    const card = `
      <div class="card shadow-sm card-square" data-id="${id}">
        <div class="card-body">
          <h5 class="card-title"><b>${name}</b></h5>
          <p class ="card-text">Semana: ${week}</p>
          <p class ="card-text">Prioridad: ${priority}</p>
          <p class ="card-text">Año: ${year}</p>
          <p class ="card-text">Descripcion: ${description}</p>
        </div>
        <div class="card-icons d-flex justify-content-between position-absolute bottom-0 start-0 end-0">
          <a href="/Producto2/Weektasks.html" class="card-link"><i class="bi bi-eye"></i></a>
          <a href="#" class="card-link">
            <i class="bi bi-trash delete-icon" data-bs-toggle="modal" data-bs-target="#eliminarTarjetaModal" data-card="${id}"></i>
          </a>
        </div>
      </div>
    `;

    cardContainer.innerHTML = card;

    const mainRow = document.querySelector("main .row");
    mainRow.appendChild(cardContainer);
  }

  function mostrarModal(mensaje) {
    const modal = new bootstrap.Modal(document.getElementById("genericModal"));
    const mensajeModal = document.getElementById("genericModalMessage");
    mensajeModal.innerText = mensaje;
    modal.show();
  }

  confirmBtn.addEventListener("click", async (e) => {
    var formulario = document.getElementById("cardForm");
    var inputsRequeridos = formulario.querySelectorAll("[required]");
    var valido = true;

    for (var i = 0; i < inputsRequeridos.length; i++) {
      if (!inputsRequeridos[i].value) {
        valido = false;
        break;
      }
    }

    if (valido) {
      e.preventDefault();
      let name = document.getElementById("name").value;
      let week = document.getElementById("week").value;
      let priority = document.getElementById("priority").value;
      let year = document.getElementById("year").value;
      let description = document.getElementById("description").value;

      let prioritySelect = document.getElementById("priority");
      let priorityText = prioritySelect.options[prioritySelect.selectedIndex].text;

      // Aquí se validan los campos del formulario
      // ...

      // Llama a la función createCard con los datos del formulario
      await createCard(name, week, priorityText, year, description);

      // Cerrar el modal
      const nuevaSemanaModal = document.getElementById("nuevaSemanaModal");
      const modal = bootstrap.Modal.getInstance(nuevaSemanaModal);
      modal.hide();
      // Limpiar el formulario
      cardForm.reset();
    } else {
      mostrarModal("Faltan campos por completar");
    }
  });
});

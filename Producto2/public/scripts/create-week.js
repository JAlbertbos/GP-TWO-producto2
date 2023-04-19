
function removeExistingCards() {
  const mainRow = document.querySelector("main .row");
  const cardContainers = mainRow.querySelectorAll(".col-md-4.mb-4");
  cardContainers.forEach((cardContainer) => {
    cardContainer.remove();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const confirmBtn = document.getElementById("confirmButton");
  const cardForm = document.getElementById("cardForm");

  let selectedColor = "black";
  const circles = document.querySelectorAll(".circle");
  const description = document.querySelector("textarea");

  circles.forEach(circle => {
      circle.addEventListener("click", () => {
          selectedColor = circle.classList[1];
          description.style.borderColor = selectedColor;
      });
  });

  const priorityMapping = {
    'Alta': 1,
    'Media': 2,
    'Baja': 3,
  };

  function priorityToString(priority) {
    switch (parseInt(priority)) {
      case 1:
        return "Alta";
      case 2:
        return "Media";
      case 3:
        return "Baja";
      default:
        return "";
    }
  }

  async function apiFetch(route, method, data = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
  
    if (data) {
      options.body = JSON.stringify(data);
    }
  
    const response = await fetch(route, options);
  
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  
    return await response.json();
  }
  
  

  async function saveWeekToServer(name, week, priority, year, description, borderColor) {
    try {
      const data = {
        name,
        week: parseInt(week),
        priority,
        year: parseInt(year),
        description,
        borderColor,
      };
  
      const createdWeek = await apiFetch('/weeks', 'POST', data);
  
      
      console.log('Respuesta del servidor al crear la semana:', createdWeek);
  
      if (createdWeek !== null && createdWeek.hasOwnProperty('_id')) {
        console.log('Creando respuesta semana:', createdWeek);
        return createdWeek._id;
      } else {
        console.error("Error: La respuesta del servidor es nula o no tiene la propiedad _id");
      }
    } catch (error) {
      console.error('Error al guardar la semana:', error);
    }
  }
  
  function removeExistingCards() {
    const mainRow = document.querySelector("main .row");
    const cardContainers = mainRow.querySelectorAll(".col-md-4.mb-4");
    cardContainers.forEach((cardContainer) => {
      cardContainer.remove();
    });
  }
  
 

  async function addCardToDOM(id, name, week, priority, year, description, color) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("col-md-4", "mb-4");
  
    const priorityText = priorityToString(priority);
  
    const card = `
      <div class="card shadow-sm card-square" data-id="${id}" style="border-color: ${color}">
        <div class="card-body">
          <h5 class="card-title"><b>${name}</b></h5>
          <p class ="card-text">Semana: ${week}</p>
          <p class ="card-text">Prioridad: "${priorityText}"</p>
          <p class ="card-text">Año: ${year}</p>
          <p class ="card-text">Descripcion: ${description}</p>
        </div>
        <div class="card-icons d-flex justify-content-between position-absolute bottom-0 start-0 end-0">
          <a href="./Weektasks.html?weekId=${id}" class="card-link"><i class="bi bi-eye"></i></a>
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

  async function createCard(name, week, priority, year, description, color) {
    const id = await saveWeekToServer(name, week, priority, year, description, color);
    if (id) {
      addCardToDOM(id, name, week, priority, year, description, color);
    }
  }

  // La función deleteCard elimina una tarjeta del DOM.
  function deleteCard(cardContainer) {
    cardContainer.remove();
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
      let priority = parseInt(document.getElementById("priority").value);
      let year = document.getElementById("year").value;
      let description = document.getElementById("description").value;

      // Validar nombre
      if (name.trim() === "") {
        mostrarModal("Por favor ingrese un nombre válido.");
        return;
      }

      // validar Semana
      const weekRegex = /^(0?[1-9]|[1-4][0-9]|5[0-3])$/;
      if (!weekRegex.test(week)) {
        mostrarModal("Por favor ingrese un número de semana válido (entre 01 y 53).");
        return;
      }

      // validar campo de prioridad
      if (![1, 2, 3].includes(priority)) {
        mostrarModal("Por favor seleccione una prioridad válida (Alta, Media o Baja).");
        return;
      }

      // validar campo de año
      const yearRegex = /^\d{4}$/;
      if (!yearRegex.test(year)) {
        mostrarModal("Por favor ingrese un año válido (formato: AAAA).");
        return;
      }

      // Validar descripción
      if (description.trim() === "") {
        mostrarModal("Por favor ingrese una descripción válida.");
        return;
      }

      await createCard(name, week, priority, year, description, selectedColor);

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

  document.querySelectorAll(".delete-icon").forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", (e) => {
      e.preventDefault();
      const cardContainer = e.target.closest(".col-md-4.mb-4");
      deleteCard(cardContainer);
    });
  });

  async function loadWeeks() {
    try {
    
      removeExistingCards();
      
      const weeks = await apiFetch('/weeks', 'GET');
  
      for (const week of weeks) {
        const { _id, name, week: weekNumber, priority, year, description, borderColor } = week;
        addCardToDOM(_id, name, weekNumber, priority, year, description, borderColor);
      }
    } catch (error) {
      console.error('Error al cargar las semanas:', error);
    }
  }
  
  




  loadWeeks();
});
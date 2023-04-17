document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmButton");
  const cardForm = document.getElementById("cardForm");

  // Función para guardar una semana en la base de datos
  async function saveWeekToDatabase(weekData) {
    try {
      const response = await fetch('URL_DE_TU_API/saveWeek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(weekData)
      });

      if (!response.ok) {
        throw new Error('Error al guardar la semana');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Función para eliminar una semana de la base de datos
  async function deleteWeekFromDatabase(weekId) {
    try {
      const response = await fetch(`URL_DE_TU_API/deleteWeek/${weekId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la semana');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  //Creacion de tarjetas
  function createCard(name, id, week, priority, year, description) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("col-md-4", "mb-4");
  
    const card = `
      <div class="card shadow-sm card-square" data-id="${id}" style="border-color: ${selectedColor}">
        <div class="card-body">
          <h5 class="card-title"><b>${name}</b></h5>
          <p class ="card-text">Semana: ${week}</p>
          <p class ="card-text">Prioridad: ${priority}</p>
          <p class ="card-text">Año: ${year}</p>
          <p class ="card-text">Descripcion: ${description}</p>
        </div>
        <div class="card-icons d-flex justify-content-between position-absolute bottom-0 start-0 end-0">
          <a href="/Producto1/Weektasks.html" class="card-link"><i class="bi bi-eye"></i></a>
          <a href="#" class="card-link">
            <i class="bi bi-trash delete-icon" data-bs-toggle="modal" data-bs-target="#eliminarTarjetaModal" data-card="${id}"></i>
          </a>
        </div>
      </div>
    `;
  
    cardContainer.innerHTML = card;
  
    const mainRow = document.querySelector("main .row");
    mainRow.appendChild(cardContainer);
  
    // Escuchar eventos de click en los iconos de eliminar
    const deleteIcons = document.querySelectorAll(".bi-trash");
    deleteIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    const cardId = card.getAttribute("data-id");
    const deleteCardBtn = document.getElementById("eliminarTarjetaBtn");
    deleteCardBtn.setAttribute("data-card", cardId);
  });
});

// Escuchar evento de click en el botón de eliminar tarjeta
const deleteCardBtn = document.querySelector("#eliminarTarjetaBtn");
deleteCardBtn.addEventListener("click", () => {
  const cardId = deleteCardBtn.getAttribute("data-card");
  const card = document.querySelector(`[data-id="${cardId}"]`);
  if (card) {
    card.closest('.col-md-4.mb-4').remove();
    const eliminarTarjetaModalEl = document.getElementById("eliminarTarjetaModal");
    const eliminarTarjetaModal = bootstrap.Modal.getInstance(eliminarTarjetaModalEl);
    eliminarTarjetaModal.hide();
  }
});
    
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
      // Guardar la semana en la base de datos
      await saveWeekToDatabase({
        id,
        name,
        week,
        priority,
        year,
        description
      });
      // validar  Nombre
      const nameRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/;
      if (!nameRegex.test(name)) {
        mostrarModal("Por favor ingrese un nombre válido.");
        return;
      }

      // validar  Semana
      const weekRegex = /^(0?[1-9]|[1-4][0-9]|5[0-3])$/;
      if (!weekRegex.test(week)) {
      mostrarModal("Por favor ingrese un número de semana válido (entre 01 y 53).");
      return;
      }

      const optionsRegex = /^(Alta|Media|Baja)$/;
      if (!optionsRegex.test(option)) {
        mostrarModal("Por favor seleccione una opción válida.");
        return;
      }

      // validar  campo de año
      const yearRegex = /^\d{4}$/;
      if (!yearRegex.test(year)) {
        mostrarModal("Por favor ingrese un año válido (formato: AAAA).");
        return;
      }

      const id = generateRandomId();

      createCard(name, id, week, priority, year);

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

    // Event listener para los íconos de eliminar
    document.querySelectorAll(".delete-icon").forEach((deleteIcon) => {
      deleteIcon.addEventListener("click", async (e) => {
        e.preventDefault();
        const cardContainer = e.target.closest(".col-md-4.mb-4");
        const cardId = cardContainer.querySelector(".card").getAttribute("data-id");
  
        // Eliminar la semana de la base de datos
        await deleteWeekFromDatabase(cardId);
  
        // Eliminar la tarjeta del DOM
        deleteCard(cardContainer);
      });
    });
  });

  async function loadStoredTasks() {
    try {
      const response = await fetch('URL_DE_TU_API/loadWeeks');
  
      if (!response.ok) {
        throw new Error('Error al cargar las semanas');
      }
  
      const weeksData = await response.json();
      weeksData.forEach(weekData => {
        createCard(weekData.name, weekData.id, weekData.week, weekData.priority, weekData.year, weekData.description);
      });
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Cargar las semanas almacenadas al cargar la página
  document.addEventListener('DOMContentLoaded', loadStoredTasks);
  
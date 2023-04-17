document.addEventListener("DOMContentLoaded", () => {
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

  // Función para generar id random
  function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }

  // Función para convertir prioridad a string
  function priorityToString(priority) {
    switch (priority) {
      case "1":
        return "Alta";
      case "2":
        return "Media";
      case "3":
        return "Baja";
      default:
        return "";
    }
  }
  
  function loadWeeksFromLocalStorage() {
    const weeks = JSON.parse(localStorage.getItem("weeks")) || [];
    weeks.forEach(week => {
      createCard(week.name, week.id, week.week, week.priority, week.year, week.description, week.borderColor);
    });
  }
  // Función para guardar semana en local storage
  function saveWeekToLocalStorage(id, name, week, priority, year, description, borderColor) {
    const weekData = {
      id,
      name,
      week,
      priority,
      year,
      description,
      borderColor
    };

    let weeks = JSON.parse(localStorage.getItem("weeks")) || [];
    weeks.push(weekData);
    localStorage.setItem("weeks", JSON.stringify(weeks));
  }

  

  function createCard(name, id, week, priority, year, description, color) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("col-md-4", "mb-4");

    const priorityText = priorityToString(priority);

    const card = `
      <div class="card shadow-sm card-square" data-id="${id}" style="border-color: ${color}">
        <div class="card-body">
          <h5 class="card-title"><b>${name}</b></h5>
          <p class ="card-text">Semana: ${week}</p>
          <p class ="card-text">Prioridad: ${priorityText}</p>
          <p class ="card-text">Año: ${year}</p>
          <p class ="card-text">Descripcion: ${description}</p>
        </div>
        <div class="card-icons d-flex justify-content-between position-absolute bottom-0 start-0 end-0">
          <a href="/Producto2/Weektasks.html?weekId=${id}" class="card-link"><i class="bi bi-eye"></i></a>
          <a href="#" class="card-link">
            <i class="bi bi-trash delete-icon" data-bs-toggle="modal" data-bs-target="#eliminarTarjetaModal" data-card="${id}"></i>
          </a>
        </div>
      </div>
    `;

    cardContainer.innerHTML = card;

    const mainRow = document.querySelector("main .row");
    mainRow.appendChild(cardContainer);

    // Save week to localStorage
    saveWeekToLocalStorage(id, name, week, priority, year, description, color);
  
    
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
    
    confirmBtn.addEventListener("click", (e) => {
    var formulario = document.getElementById("cardForm");
    var inputsRequeridos = formulario.querySelectorAll("[required]");
    var valido = true;
    const id = generateRandomId();

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

  // Validar nombre
    if (name.trim() === "") {
      mostrarModal("Por favor ingrese un nombre válido.");
      return;
    }

  // validar  Semana
  const weekRegex = /^(0?[1-9]|[1-4][0-9]|5[0-3])$/;
  if (!weekRegex.test(week)) {
  mostrarModal("Por favor ingrese un número de semana válido (entre 01 y 53).");
  return;
  }

  // validar  campo de prioridad
  if (!["1", "2", "3"].includes(priority)) {
    mostrarModal("Por favor seleccione una prioridad válida (Alta, Media o Baja).");
    return;
  }

  // validar  campo de año
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

  const id = generateRandomId();

  createCard(name, id, week, priority, year, description, selectedColor);


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
});
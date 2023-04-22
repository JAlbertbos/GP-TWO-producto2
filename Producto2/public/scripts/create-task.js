let tarjetaAEditar;
let tarjetaSeleccionada;
let selectedDay;

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var element = document.getElementById(data);
  if (!event.target.contains(element)) {
    event.target.appendChild(element);
  }
}

document.querySelectorAll('[data-day]').forEach(button => {
  button.addEventListener('click', function () {
    selectedDay = this.getAttribute('data-day');
  });
});

const form = document.querySelector('#formtask form');
const nombreTarea = document.querySelector('#nombreTarea');
const descripcion = document.querySelector('#descripcion');
const horaInicio = document.querySelector('#horaInicio');
const horaFinal = document.querySelector('#horaFinal');
const participantes = document.querySelector('#participantes');
const ubicacion = document.querySelector('#ubicacion');
const tareaTerminadaCheckbox = document.querySelector('#tareaTerminadaCheckbox');
const iconoPapelera = document.createElement('i');
iconoPapelera.classList.add('bi', 'bi-trash-fill', 'ms-2', 'eliminar-tarea', 'text-danger');

function validarCampos() {
  let mensajeError = '';

  if (nombreTarea.value.trim() === '') {
    mensajeError = 'El nombre de la tarea no puede estar vacío.';
  } else if (descripcion.value.trim() === '') {
    mensajeError = 'La descripción no puede estar vacía.';
  } else if (horaInicio.value === '') {
    mensajeError = 'La hora de final no puede estar vacía.';
  } else if (participantes.value.trim() === '') {
    mensajeError = 'Los participantes no pueden estar vacíos.';
  } 

  if (mensajeError) {
    document.getElementById('genericModalMessage').innerText = mensajeError;
    const modal = new bootstrap.Modal(document.getElementById('genericModal'));
    modal.show();
    return false;
  }

  return true;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!validarCampos()) {
    return;
  }

  const taskData = {
    title: nombreTarea.value,
    description: descripcion.value,
    startTime: horaInicio.value,
    endTime: horaFinal.value,
    participants: participantes.value,
    location: ubicacion.value,
    completed: tareaTerminadaCheckbox?.checked
  };

  if (tarjetaAEditar) {
    // Actualizar tarjeta existente
    const taskId = tarjetaAEditar.getAttribute('data-id');
    tarjetaAEditar.remove();
    addCardToDOM(taskId, taskData, selectedDay);
    tarjetaAEditar = undefined;
  } else {
    // Crear una nueva tarjeta
    createTask(taskData, selectedDay);
  }

  // Resetear el formulario
  form.reset();

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("formtask"));
  modal.hide();
});



function addCardToDOM(taskId, taskData, selectedDay) {
  const tarjeta = document.createElement('div');
  tarjeta.id = `tarjeta-${taskId}`;
  tarjeta.classList.add('card', 'my-3', 'draggable');
  tarjeta.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="card-title">${taskData.title}</h5>
        <button type="button" id="eliminar-${taskId}" class="btn btn-link p-0 eliminar-tarea">${iconoPapelera.outerHTML}</button>
      </div>
      <p class="card-text">${taskData.description}</p>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Hora de inicio:</strong> ${taskData.startTime}</li>
        <li class="list-group-item"><strong>Hora de final:</strong> ${taskData.endTime}</li>
        <li class="list-group-item"><strong>Participantes:</strong> ${taskData.participants}</li>
        <li class="list-group-item"><strong>Ubicación:</strong> ${taskData.location}</li>
      </ul>
      <div class="form-check mt-3">
        <input class="form-check-input" type="checkbox" id="tarea-${taskData.title}" ${taskData.completed ? 'checked' : ''}>
        <label class="form-check-label" for="tarea-${taskData.title}">Tarea terminada</label>
      </div>
      <div class="mt-auto d-flex justify-content-end">
      <button type="button" class="btn btn-link p-0 editar-tarea"><i class="bi bi-pencil-square text-primary"></i></button>
      </div>
    </div>
  `;
  tarjeta.setAttribute('draggable', true);
  tarjeta.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('text/plain', this.id);
  });
  let dropzone;
  if (selectedDay) {
    dropzone = document.querySelector(`.contenedor-dia[data-day="${selectedDay}"] .dropzone`);
  }
  if (!dropzone) {
    dropzone = document.querySelector('.zone-bottom');
  }

  dropzone.appendChild(tarjeta);
  selectedDay = undefined;

  const checkbox = tarjeta.querySelector('.form-check-input');
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      tarjeta.classList.add('borde-verde');
    } else {
      tarjeta.classList.remove('borde-verde');
    }
  });


  const botonEliminar = tarjeta.querySelector('.eliminar-tarea');
botonEliminar.addEventListener('click', function () {
  tarjetaSeleccionada = tarjeta;
  const eliminarTareaModalEl = document.getElementById("eliminarTareaModal");
  const eliminarTareaModal = new bootstrap.Modal(eliminarTareaModalEl);
  eliminarTareaModal.show();
});

  const botonEditar = tarjeta.querySelector('.editar-tarea');
  botonEditar.addEventListener('click', function () {
   
    tarjetaAEditar = tarjeta;
    const titulo = tarjeta.querySelector('.card-title').innerText;
    const desc = tarjeta.querySelector('.card-text').innerText;
    const horaInicioTexto = tarjeta.querySelector('.list-group-item:nth-child(1)').innerText.replace('Hora de inicio: ', '');
    const horaFinalTexto = tarjeta.querySelector('.list-group-item:nth-child(2)').innerText.replace('Hora de final: ', '');
    const participantesTexto = tarjeta.querySelector('.list-group-item:nth-child(3)').innerText.replace('Participantes: ', '');
    const ubicacionTexto = tarjeta.querySelector('.list-group-item:nth-child(4)').innerText.replace('Ubicación: ', '');
    const tareaTerminada = tarjeta.querySelector('.form-check-input').checked;

    nombreTarea.value = titulo;
    descripcion.value = desc;
    horaInicio.value = horaInicioTexto;
    horaFinal.value = horaFinalTexto;
    participantes.value = participantesTexto;
    ubicacion.value = ubicacionTexto;
    if (tareaTerminadaCheckbox) {
        tareaTerminadaCheckbox.checked = tareaTerminada;
    }
    
    const modal = new bootstrap.Modal(document.getElementById("formtask"));
    modal.show();
  });
  
}

function createTask(taskData, selectedDay) {
  const taskId = Date.now().toString();
  addCardToDOM(taskId, taskData, selectedDay);
}

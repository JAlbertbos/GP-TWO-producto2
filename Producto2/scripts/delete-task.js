async function deleteTaskFromServer(taskId) {
  const query = `
    mutation {
      deleteTask(id: "${taskId}") {
        id
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

  const result = await response.json();
  return result.data.deleteTask;
}

async function deleteCard(card) {
  const taskId = card.getAttribute("data-id");
  await deleteTaskFromServer(taskId);
  card.closest('.col-md-4.mb-4').remove();
}

const deleteCardBtn = document.querySelector("#eliminarTareaBotn");
deleteCardBtn.addEventListener("click", async () => {
  if (selectedCard) {
    await deleteCard(selectedCard);
    selectedCard = null;
    const eliminarTareaModalEl = document.getElementById("eliminarTareaModal");
    const eliminarTareaModal = bootstrap.Modal.getInstance(eliminarTareaModalEl);
    eliminarTareaModal.hide();
  }
});

document.addEventListener("click", function (event) {
  if (event.target.matches(".eliminar-tarea")) {
    const card = event.target.closest(".card");
    selectedCard = card;
    // Mostrar el modal de confirmación de eliminación
    const eliminarTareaModalEl = document.getElementById("eliminarTareaModal");
    const eliminarTareaModal = new bootstrap.Modal(eliminarTareaModalEl);
    eliminarTareaModal.show();
  }
});
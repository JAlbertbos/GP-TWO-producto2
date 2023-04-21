let selectedCard = null;

async function deleteWeekFromServer(id) {
  try {
    await apiFetch(`/weeks/${id}`, 'DELETE');
    console.log('Semana eliminada con éxito');
  } catch (error) {
    console.error('Error al eliminar la semana:', error);
  }
}

const deleteCardBtn = document.querySelector("#eliminarTareaBotn");
if (deleteCardBtn) {
  deleteCardBtn.addEventListener("click", async () => {
    if (selectedCard) {
      const weekId = selectedCard.getAttribute("data-id");
      await deleteWeekFromServer(weekId);
      selectedCard.remove();
      selectedCard = null;
      const eliminarTareaModalEl = document.getElementById("eliminarTareaModal");
      const eliminarTareaModal = bootstrap.Modal.getInstance(eliminarTareaModalEl);
      eliminarTareaModal.hide();
    }
  });
}

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

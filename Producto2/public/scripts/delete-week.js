document.addEventListener("DOMContentLoaded", () => {
  let selectedCard = null;

  // Escuchar eventos de click en los iconos de eliminar
  const deleteIcons = document.querySelectorAll(".bi-trash");
  deleteIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const card = event.target.closest(".card");
      selectedCard = card;
    });
  });

  // Escuchar evento de click en el botón de eliminar tarjeta
  const deleteCardBtn = document.querySelector("#eliminarTarjetaBtn");
  deleteCardBtn.addEventListener("click", async () => {
    if (selectedCard) {
      const card = event.target.closest(".card");
      const cardContainer = selectedCard.closest('.col-md-4.mb-4');
      const weekId = cardContainer.dataset.id;
      await deleteWeekFromServer(weekId);
      selectedCard = null;
      const eliminarTarjetaModalEl = document.getElementById("eliminarTarjetaModal");
      const eliminarTarjetaModal = bootstrap.Modal.getInstance(eliminarTarjetaModalEl);
      eliminarTarjetaModal.hide();
    }
  });
});
async function deleteCard(e) {
  const cardContainer = e.target.closest(".col-md-4.mb-4");
  const weekId = cardContainer.dataset.id;
  await deleteWeek(weekId);
  cardContainer.remove();
}

async function deleteWeekFromServer(weekId) {
  try {
    const deletedWeek = await apiFetch(`/weeks/${id}`, 'DELETE');
    console.log('Respuesta del servidor al eliminar la semana:', deletedWeek);
    if (deletedWeek !== null && deletedWeek.hasOwnProperty('_id')) {
      console.log('Eliminando semana del DOM:', deletedWeek);
      const cardContainer = document.querySelector(`.col-md-4.mb-4[data-id="${id}"]`);
      deleteCard(cardContainer);
    } else {
      console.error("Error: La respuesta del servidor es nula o no tiene la propiedad _id");
    }
  } catch (error) {
    console.error('Error al eliminar la semana:', error);
  }
}

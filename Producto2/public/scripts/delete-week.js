import { deleteWeek } from './graphql-queries.js';

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
      const weekId = selectedCard.getAttribute('data-week-id');
      try {
        await deleteWeek(weekId);
        selectedCard.closest('.col-md-4.mb-4').remove();
        selectedCard = null;
        const eliminarTarjetaModalEl = document.getElementById("eliminarTarjetaModal");
        const eliminarTarjetaModal = bootstrap.Modal.getInstance(eliminarTarjetaModalEl);
        eliminarTarjetaModal.hide();
      } catch (error) {
        console.error('Error al eliminar la semana:', error);
      }
    }
  });
});
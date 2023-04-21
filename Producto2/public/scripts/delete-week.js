document.addEventListener("DOMContentLoaded", async () => {
  async function deleteWeekFromServer(id) {
    try {
      const response = await fetch(`/weeks/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Week eliminada:', result);

    } catch (error) {
      console.error("Error al eliminar la semana:", error);
    }
  }

  async function deleteCard(id) {
    const cardContainers = document.querySelectorAll(".col-md-4.mb-4");

    cardContainers.forEach((cardContainer) => {
      const card = cardContainer.querySelector(".card");

      if (card.getAttribute("data-id") === id) {
        cardContainer.remove();
      }
    });
  }

  const mainRow = document.querySelector("main .row");

  mainRow.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-icon")) {
      e.preventDefault();
      const card = e.target.closest(".card");
      const weekId = card.getAttribute("data-id");

      const eliminarTarjetaModalEl = document.getElementById("eliminarTarjetaModal");
      const eliminarTarjetaModal = new bootstrap.Modal(eliminarTarjetaModalEl, { keyboard: false });

      const eliminarTarjetaBtn = eliminarTarjetaModalEl.querySelector("#eliminarTarjetaBtn");

      // Elimina el evento click existente para evitar múltiples clics
      eliminarTarjetaBtn.removeEventListener('click', handleClick);

      // Agrega un nuevo evento click
      eliminarTarjetaBtn.addEventListener("click", handleClick);

      async function handleClick() {
        await deleteWeekFromServer(weekId);
        deleteCard(weekId);

        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        eliminarTarjetaModal.hide();
      }

      eliminarTarjetaModal.show();
    }
  });
});

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

  async function deleteTask(taskId) {
    const query = `
      mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
          id
        }
      }
    `;

    const variables = { id: taskId };

    try {
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

      const jsonResponse = await response.json();

      if (jsonResponse.errors) {
        console.error(jsonResponse.errors);
        throw new Error("Failed to delete task");
      }

    } catch (error) {
      console.error(error);
      mostrarModal("Ocurrió un error al eliminar la tarea del servidor.");
      return;
    }
  }

  function mostrarModal(mensaje) {
    const modal = new bootstrap.Modal(document.getElementById("genericModal"));
    const mensajeModal = document.getElementById("genericModalMessage");
    mensajeModal.innerText = mensaje;
    modal.show();
  }

  // Escuchar evento de click en el botón de eliminar tarjeta
  const deleteCardBtn = document.querySelector("#eliminarTarjetaBtn");
  deleteCardBtn.addEventListener("click", async () => {
    if (selectedCard) {
      const taskId = selectedCard.getAttribute("data-id");
      await deleteTask(taskId);

      selectedCard.closest('.col-md-4.mb-4').remove();
      selectedCard = null;
      const eliminarTarjetaModalEl = document.getElementById("eliminarTarjetaModal");
      const eliminarTarjetaModal = bootstrap.Modal.getInstance(eliminarTarjetaModalEl);
      eliminarTarjetaModal.hide();
    }
  });
});

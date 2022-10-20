const socket = io();

socket.on("mensajes", (data) => {
  renderMs(data);
});

const renderMs = (data) => {
  let html = data.mensajes
    .map((x) => {
      return `
          <div>
              <p style="color: brown;">${x.tipo}<strong class="text-primary">${x.email}</strong> [${x.timestamp}] <i class="text-success">${x.texto}</i></p>
          </div>
          `;
    })
    .join(" ");

  document.querySelector("#c-mensajes").innerHTML = html;
};

const addMessage = () => {
  let msObj = {
    email: document.querySelector("#email").value,
    tipo: document.querySelector("#tipo").value,
    texto: document.querySelector("#text").value,
  };
  document.querySelector("#text").value = "";
  socket.emit("Msn", msObj);
  return false;
};

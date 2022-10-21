import { MensajesService } from "../../services/mensajesService.js";
import moment from "moment/moment.js";

const mensajesService = new MensajesService();

export default (io) => {
  io.on("connection", async (socket) => {
    const mensajes = await mensajesService.mostrarTodos()
    socket.emit("mensajes", (mensajes));
    socket.on("dataMsn", async (x) => {
      const { email, texto, tipo } = x;
      let newMen = {
        email: email,
        tipo: tipo,
        texto: texto,
        timestamp: moment().format("DD/MM/YYYY hh:mm:ss"),
      };
      await await mensajesService.guardarMensajes(newMen);
      const chat = await mensajesService.mostrarTodos()
      io.sockets.emit("mensajes", chat);
    });
  });
};

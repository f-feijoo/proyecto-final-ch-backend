import { MensajesService } from "../../services/mensajesService.js";
import moment from "moment/moment.js";

const mensajesService = new MensajesService();

export default (io) => {
  io.on("connection", async (socket) => {
    socket.emit("mensajes", await mensajesService.mostrarTodos());
    socket.on("dataMsn", async (x) => {
      console.log(x)
      const { email, texto, tipo } = x;
      let newMen = {
        email: email,
        tipo: tipo,
        texto: texto,
        timestamp: moment().format("DD/MM/YYYY hh:mm:ss"),
      };
      await await mensajesService.guardarMensajes(newMen);
      io.sockets.emit("mensajes", await mensajesService.mostrarTodos());
    });
  });
};

import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";

class MensajesDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("mensajes", {
      email: { type: String, required: true },
      tipo: { type: String, required: true },
      timestamp: { type: String, required: true },
      texto: { type: String, required: true },
    });
  }
}

export default MensajesDaoMongoDb;

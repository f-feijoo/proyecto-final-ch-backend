import MensajesDaoMongoDb from "../database/daos/mensajes/MensajesDaoMongoDb.js";

export class MensajesService {
  constructor() {
    this.mensajes = MensajesDaoMongoDb;
  }

  async mostrarTodos(obj) {
    return await this.mensajes.mostrarTodos();
  }

  async guardarMensajes(obj) {
    return await this.mensajes.guardar(obj);
  }
}

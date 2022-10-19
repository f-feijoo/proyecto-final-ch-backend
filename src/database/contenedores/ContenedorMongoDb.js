import mongoose from "mongoose";
import config from "../../config.js";
import { asPOJO, renameField, removeField } from "../../utils/objectUtils.js";
import log4js from "../../utils/loggers/config.js";

const loggerFiles = log4js.getLogger("errorLogs");
const loggerConsole = log4js.getLogger();

mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

mongoose.connection.on("open", () => {
  loggerConsole.info("Database ok!");
});

mongoose.connection.on("error", () => {
  loggerConsole.info("Database error");
});

class ContenedorMongoDb {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }
  async mostrar(obj) {
    try {
      const documento = await this.coleccion.find(obj);
      if (documento.length == 0) {
        loggerFiles.error("Error al listar por id: no encontrado");
      } else {
        const result = renameField(asPOJO(documento[0]), "_id", "id");
        return result;
      }
    } catch (error) {
      loggerFiles.error(error);
      return null;
    }
  }

  async mostrarTodos() {
    try {
      let documentos = await this.coleccion.find();
      documentos = documentos.map(asPOJO);
      documentos = documentos.map((d) => renameField(d, "_id", "id"));
      return documentos;
    } catch (error) {
      loggerFiles.error(error);
    }
  }

  async guardar(obj) {
    try {
      let doc = await this.coleccion.create(obj);
      doc = asPOJO(doc);
      renameField(doc, "_id", "id");
      return doc;
    } catch (error) {
      loggerFiles.error(error);
    }
  }

  async actualizar(elem) {
    try {
      renameField(elem, "id", "_id");
      const { n, nModified } = await this.coleccion.replaceOne(
        { _id: elem._id },
        elem
      );
      if (n == 0 || nModified == 0) {
        loggerFiles.error("Error al actualizar: no encontrado");
      } else {
        renameField(elem, "_id", "id");
        return asPOJO(elem);
      }
    } catch (error) {
      loggerFiles.error(error);
    }
  }

  async borrar(id) {
    try {
      const { n, nDeleted } = await this.coleccion.deleteOne({ _id: id });
      if (n == 0 || nDeleted == 0) {
        loggerFiles.error("Error al borrar: no encontrado");
      }
    } catch (error) {
      loggerFiles.error(error);
    }
  }

  async borrarTodo() {
    try {
      await this.coleccion.deleteMany({});
    } catch (error) {
      loggerFiles.error(error);
    }
  }
}

export default ContenedorMongoDb;

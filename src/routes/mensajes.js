import express from "express";
import { mostrarMensajesUsuario, mostrarTodosMensajes } from "../controllers/mensajesController.js";

const { Router } = express;

const mensajesRouter = new Router();

mensajesRouter.get("/:email", mostrarMensajesUsuario);

mensajesRouter.get("/", mostrarTodosMensajes);


export default mensajesRouter;
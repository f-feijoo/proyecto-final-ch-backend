import express from "express";
import {
  mostrarCarrito,
  agregarProducto,
  finalizarCarrito,
  crearCarrito,
  eliminarCarrito,
  eliminarProducto,
} from "../controllers/carritoController.js";

const { Router } = express;

const carritoRouter = new Router();

carritoRouter.get("/:id/productos", mostrarCarrito);

carritoRouter.post("/:id/productos", agregarProducto);

carritoRouter.get("/:id/productos/finalizar", finalizarCarrito);

carritoRouter.post("/", crearCarrito);

carritoRouter.delete("/:id", eliminarCarrito);

carritoRouter.delete("/:id/productos/:id_prod", eliminarProducto);

export default carritoRouter;

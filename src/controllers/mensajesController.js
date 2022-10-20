import { CarritoService } from "../services/carritoService.js";
import { UsuarioService } from "../services/usuarioService.js";

const carritoService = new CarritoService();
const usuarioService = new UsuarioService();

export const mostrarMensajesUsuario = async (req, res) => {
  res.render("mensajes");
};

export const mostrarTodosMensajes = async (req, res) => {
  let carrito = await carritoService.mostrarCarrito({
    usuario: req.user.username,
  });
  let param;
  if (carrito) {
    param = "api/carritos/" + carrito.id + "/productos";
  } else {
    param = "#";
  }
  res.render("mensajes", {
    nroC: param,
    user: await usuarioService.mostrarUsuario({ username: req.user.username }),
  });
};

import { CarritoService } from "../services/carritoService.js";
import { ProductoService } from "../services/productoService.js";
import { UsuarioService } from "../services/usuarioService.js";

const carritoService = new CarritoService();
const productoService = new ProductoService();
const usuarioService = new UsuarioService();

export const index = async (req, res) => {
  let carrito = await carritoService.mostrarCarrito({
    usuario: req.user.username,
    finalizado: false,
  });
  let param;
  if (carrito) {
    param = "api/carritos/" + carrito.id + "/productos";
  } else {
    param = "#";
  }
  res.render("index", {
    data: await productoService.mostrarTodosProductos(),
    nroC: param,
    user: await usuarioService.mostrarUsuario({ username: req.user.username }),
  });
};

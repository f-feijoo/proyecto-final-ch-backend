import { CarritoService } from "../services/carritoService.js";
import { ProductoService } from "../services/productoService.js";
import { UsuarioService } from "../services/usuarioService.js";
import mailCompraAdmin from "../utils/nodemailer/mailCompra.js";
import mensajeCliente from "../utils/twilio/mensajeCompra.js";
import mensajeCompraAdmin from "../utils/twilio/whatsappCompra.js";

const carritoService = new CarritoService();
const productoService = new ProductoService();
const usuarioService = new UsuarioService();

export const mostrarCarrito = async (req, res) => {
  let chart = await carritoService.mostrarCarrito({ _id: req.params.id });
  let precioTotal = 0;
  if (chart) {
    for (const prod of chart.productos) {
      precioTotal += prod.precio;
    }
  }
  res.render("carrito", {
    data: chart,
    nroC: "/api/carritos/" + req.params.id + "/productos",
    idCarrito: req.params.id,
    user: await usuarioService.mostrarUsuario({ username: req.user.username }),
    precioTotal: precioTotal,
  });
};

export const agregarProducto = async (req, res) => {
  const carrito = await carritoService.mostrarCarrito({ _id: req.params.id });
  const producto = await productoService.mostrarProducto({ _id: req.body.id });
  await carritoService.agregarProducto(carrito, producto);
  res.send({ message: `Producto agregado` });
};

export const finalizarCarrito = async (req, res) => {
  const carrito = await carritoService.mostrarCarrito({ _id: req.params.id });
  await carritoService.finalizarCarrito(carrito);
  await mailCompraAdmin(req.user, carrito);
  await mensajeCliente(req.user);
  await mensajeCompraAdmin(carrito);
  res.render("comprado", {
    data: carrito,
    nroC: "/api/carritos/" + req.params.id + "/productos",
    idCarrito: req.params.id,
    user: req.user,
  });
};

export const crearCarrito = async (req, res) => {
  let usuario = await usuarioService.mostrarUsuario({
    username: req.user.username,
  });
  let obj = {
    timestamp: Date.now(),
    productos: [],
    usuario: req.user.username,
    finalizado: false,
    direccion: usuario.direccion,
  };
  await carritoService.crearCarrito(obj);
  res.json({ message: "Carrito creado" });
};

export const eliminarCarrito = async (req, res) => {
  let id = req.params.id;
  await carritoService.eliminarCarrito(id);
  res.json({ message: "Carrito eliminado" });
};

export const eliminarProducto = async (req, res) => {
  const carrito = await carritoService.mostrarCarrito({ _id: req.params.id });
  const index = carrito.productos.findIndex((p) => p.id == req.params.id_prod);
  if (index != -1) {
    await carritoService.eliminarProducto(carrito, index);
  }
  res.send({ message: `Producto eliminado.` });
};

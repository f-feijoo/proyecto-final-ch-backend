import { ProductoService } from "../services/productoService.js";
import { CarritoService } from "../services/carritoService.js";
import { UsuarioService } from "../services/usuarioService.js";

const productoService = new ProductoService();
const carritoService = new CarritoService();
const usuarioService = new UsuarioService();

export const mostrarProductos = async (req, res) => {
  if (req.query.admin) {
    res.render("productosAdmin", {
      data: await productoService.mostrarTodosProductos(),
    });
  } else {
    let carrito = await carritoService.mostrarCarrito({
      usuario: req.user.username,
    });
    let param;
    if (carrito) {
      param = "carritos/" + carrito.id + "/productos";
    } else {
      param = "#";
    }
    res.render("productos", {
      data: await productoService.mostrarTodosProductos(),
      nroC: param,
      user: await usuarioService.mostrarUsuario({
        username: req.user.username,
      }),
    });
  }
};

export const mostrarProducto = async (req, res) => {
  let producto = await productoService.mostrarProducto({ _id: req.params.id });
  if (producto) {
    res.render("uploaded", {
      data: producto,
    });
  } else {
    res.json({ error: "Producto no encontrado" });
  }
};

export const agregarProducto = async (req, res) => {
  if (req.query.admin) {
    let productoNuevo = {
      nombre: req.body.nombre,
      desc: req.body.desc,
      img: req.body.img,
      precio: Number.parseInt(req.body.precio),
      categoria: req.body.categoria,
    };
    res.render("uploaded", {
      data: await productoService.agregarProducto(productoNuevo),
    });
  } else {
    res.send({ error: "permiso denegado" });
  }
};

export const actualizarProducto = async (req, res) => {
  if (req.query.admin) {
    let newProd = {
      ...req.body,
    };
    res.render("uploaded", {
      data: await productoService.actualizarProducto(newProd),
    });
  } else {
    res.send({ error: "permiso denegado" });
  }
};

export const eliminarProducto = async (req, res) => {
  if (req.query.admin) {
    await productoService.eliminarProducto(req.params.id);
    res.send({ delete: "ok", id: req.params.id });
  } else {
    res.send({
      error: -1,
      descripcion: "ruta '/api/productos' método 'DELETE' no autorizada",
    });
  }
};

export const mostrarProductoCategoria = async (req, res) => {
  let carrito = await carritoService.mostrarCarrito({
    usuario: req.user.username,
  });
  let param;
  if (carrito) {
    param = "carritos/" + carrito.id + "/productos";
  } else {
    param = "#";
  }
  let productos = await productoService.mostrarTodosProductos();
  let productosCat = productos.filter(
    (prod) => prod.categoria == req.params.categoria
  );
  res.render("productos", {
    data: productosCat,
    nroC: param,
    user: await usuarioService.mostrarUsuario({
      username: req.user.username,
    }),
  });
};

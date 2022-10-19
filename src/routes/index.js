import express from "express";
import { index } from "../controllers/indexController.js";

const { Router } = express;

const router = new Router();

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

router.get("/", auth, index);

export default router;

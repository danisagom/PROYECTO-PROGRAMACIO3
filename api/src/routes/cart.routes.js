import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { checkRole } from "../middlewares/checkRole.js";
import {
  getUserCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../services/cart.services.js";

const router = express.Router();

// Obtener carrito del usuario logueado
router.get(
  "/",
  verifyToken,
  checkRole(["user", "admin", "trainer"]),
  getUserCart
);

// Agregar rutina al carrito
router.post("/", verifyToken, checkRole(["user"]), addToCart);

// Eliminar 1 item del carrito
router.delete("/:id", verifyToken, checkRole(["user"]), removeFromCart);

// Vaciar carrito completo
router.delete("/", verifyToken, checkRole(["user"]), clearCart);

export default router;

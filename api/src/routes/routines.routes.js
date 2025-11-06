import express from "express";
import {
  deleteRoutine,
  getAllRoutines,
  getRoutineById,
  postRoutine,
  putRoutine,
} from "../services/routines.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();

// Rutas públicas para ver todas las rutinas
router.get("/public", getAllRoutines);

// Todas las rutinas (según rol)
router.get("/", verifyToken, checkRole(["admin", "trainer", "user"]), getAllRoutines);

// Rutina por ID
router.get("/:id", verifyToken, checkRole(["admin", "trainer", "user"]), getRoutineById);

// Crear nueva rutina
router.post("/", verifyToken, checkRole(["admin", "trainer"]), postRoutine);

// Actualizar rutina
router.put("/:id", verifyToken, checkRole(["admin", "trainer"]), putRoutine);

// Eliminar rutina
router.delete("/:id", verifyToken, checkRole(["admin", "trainer"]), deleteRoutine);

export default router;

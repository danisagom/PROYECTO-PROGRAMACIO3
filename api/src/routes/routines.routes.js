import express from "express";
import Routines from "../model/Routines.js"; // sube un nivel desde routes a model
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
//todas las rutinas
router.get(
  "/",
  verifyToken,
  checkRole(["admin", "trainer", "user"]),
  getAllRoutines
);
//rutina por id
router.get(
  "/:id",
  verifyToken,
  checkRole(["admin", "trainer", "user"]),
  getRoutineById
);
//eliminar rutina
router.delete("/:id", verifyToken, checkRole(["admin"]), deleteRoutine);
//actualizar rutina
router.put("/:id", verifyToken, checkRole(["admin", "trainer"]), putRoutine);
//nueva rutina
router.post("/", verifyToken, checkRole(["admin", "trainer"]), postRoutine);

export default router;

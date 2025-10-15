import express from "express";
import Routines from "../model/Routines.js"; // sube un nivel desde routes a model

const router = express.Router();
//todas las rutinas
router.get("/", async (req, res) => {
  try {
    const routines = await Routines.findAll();
    res.json(routines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//falte eliminar rutina
//nueva rutina
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, duracion, nivel, ejercicios } = req.body;
    const rutina = await Routines.create({ nombre, descripcion, duracion, nivel, ejercicios });
    res.status(201).json(rutina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

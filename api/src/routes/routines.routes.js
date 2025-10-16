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
//rutina por id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rutina = await Routines.findByPk(id);
    if (rutina) {
      res.json(rutina);
    } else {
      res.status(404).json({ error: "Rutina no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//eliminar rutina
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Routines.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//actualizar rutina
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, duracion, nivel, ejercicios } = req.body;
    await Routines.update({ nombre, descripcion, duracion, nivel, ejercicios }, { where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
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

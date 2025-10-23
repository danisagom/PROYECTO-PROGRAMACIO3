import Routines from "../model/Routines.js";

export const getAllRoutines = async (req, res) => {
  try {
    const routines = await Routines.findAll();
    const result = Array.isArray(routines) ? routines : [];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json([]);
  }
};
export const getRoutineById = async (req, res) => {
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
};
export const deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    await Routines.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const postRoutine = async (req, res) => {
  try {
    const { nombre, descripcion, duracion, nivel, ejercicios } = req.body;

    // Validaciones básicas
    if (!nombre || !descripcion) {
      return res
        .status(400)
        .json({ error: "Nombre y descripción son requeridos" });
    }

    const rutina = await Routines.create({
      nombre,
      descripcion,
      duracion,
      nivel,
      ejercicios,
    });
    res.status(201).json(rutina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const putRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, duracion, nivel, ejercicios } = req.body;

    const [updatedRows] = await Routines.update(
      { nombre, descripcion, duracion, nivel, ejercicios },
      { where: { id } }
    );

    if (updatedRows > 0) {
      res.status(200).json({ message: "Rutina actualizada correctamente" });
    } else {
      res.status(404).json({ error: "Rutina no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

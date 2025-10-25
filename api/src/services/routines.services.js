import Routines from "../models/Routines.js";

export const getAllRoutines = async (req, res) => {
  try {
    const routines = await Routines.findAll();
    res.json(routines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoutineById = async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await Routines.findByPk(id);
    if (routine) {
      res.json(routine);
    } else {
      res.status(404).json({ error: "Rutina no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postRoutine = async (req, res) => {
  try {
    const { nombre, descripcion, duracion, nivel, ejercicios, img } = req.body;
    const newRoutine = await Routines.create({
      nombre,
      descripcion,
      duracion,
      nivel,
      ejercicios,
      img,
    });
    res.status(201).json(newRoutine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const putRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, duracion, nivel, ejercicios, img } = req.body;
    await Routines.update(
      { nombre, descripcion, duracion, nivel, ejercicios, img },
      { where: { id } }
    );
    res.status(200).json({ message: "Rutina actualizada" });
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

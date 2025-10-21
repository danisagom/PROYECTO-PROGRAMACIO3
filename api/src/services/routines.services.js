import Routines from "../model/Routines.js";
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
  } catch {
    res.status(500).json({ error: error.message });
  }
};
export const putRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    rutina = await Routines.update(
      { nombre, descripcion, duracion, nivel, ejercicios },
      { where: { id } }
    );
    res.status(204).send();
  } catch {
    res.status(500).json({ error: error.message });
  }
};
export const postRoutine = async (req, res) => {
  try {
    rutina = await Routines.create({
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

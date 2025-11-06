import { Routines } from '../models/index.js';

// Todas las rutinas
export const getAllRoutines = async (req, res) => {
  try {
    let routines;

    // Verificar si es una ruta pública (sin autenticación)
    if (!req.user) {
      // Acceso público - mostrar todas las rutinas
      console.log("🌐 Acceso público - mostrando todas las rutinas");
      routines = await Routines.findAll({
        order: [['createdAt', 'DESC']]
      });
    } 
    // Verificar si el usuario está autenticado y es trainer
    else if (req.user.role === "trainer") {
      // Trainer solo ve SUS rutinas
      console.log(`👤 Entrenador ${req.user.email} - mostrando SUS rutinas`);
      routines = await Routines.findAll({ 
        where: { userId: req.user.id }, // ← DESCOMENTADO - trainers ven solo sus rutinas
        order: [['createdAt', 'DESC']]
      });
    } else {
      // Admin y usuarios comunes ven todas
      console.log(`👤 Usuario ${req.user.email} (${req.user.role}) - mostrando todas las rutinas`);
      routines = await Routines.findAll({
        order: [['createdAt', 'DESC']]
      });
    }

    res.json(routines);
  } catch (error) {
    console.error("❌ Error en getAllRoutines:", error);
    res.status(500).json({ message: "Error al obtener las rutinas" });
  }
};

// Crear rutina
export const postRoutine = async (req, res) => {
  try {
    const { nombre, descripcion, duracion, nivel, ejercicios, img } = req.body;
    
    console.log("📝 Creando rutina para usuario:", req.user.email, "ID:", req.user.id);

    const newRoutine = await Routines.create({
      nombre,
      descripcion: descripcion || null,
      duracion: duracion ? parseInt(duracion) : null,
      nivel,
      ejercicios: ejercicios || null,
      img: img || null,
      userId: req.user.id // ← DESCOMENTADO - enviar el userId
    });

    console.log("✅ Rutina creada exitosamente:", newRoutine.nombre);
    res.status(201).json(newRoutine);
  } catch (error) {
    console.error("❌ Error en postRoutine:", error);
    res.status(500).json({ 
      message: "Error al crear rutina",
      error: error.message 
    });
  }
};

// Los otros servicios se mantienen igual...
export const getRoutineById = async (req, res) => {
  try {
    const routine = await Routines.findByPk(req.params.id);
    if (!routine) {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }
    res.json(routine);
  } catch (error) {
    console.error("❌ Error en getRoutineById:", error);
    res.status(500).json({ message: "Error al obtener rutina" });
  }
};

export const putRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await Routines.findByPk(id);
    
    if (!routine) {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }

    await routine.update(req.body);
    res.json(routine);
  } catch (error) {
    console.error("❌ Error en putRoutine:", error);
    res.status(500).json({ message: "Error al actualizar rutina" });
  }
};

export const deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await Routines.findByPk(id);
    
    if (!routine) {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }

    await routine.destroy();
    res.json({ message: "Rutina eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error en deleteRoutine:", error);
    res.status(500).json({ message: "Error al eliminar rutina" });
  }
};
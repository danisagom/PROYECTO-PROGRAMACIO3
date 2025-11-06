import express from "express";
import Users from "../models/Users.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();

// Todos los usuarios (solo admin)
router.get("/", verifyToken, checkRole(["admin"]), async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ['password'] } // No enviar contraseñas
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Usuario por id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar usuario (solo admin)
router.delete("/:id", verifyToken, checkRole(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    await Users.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar usuario (solo admin)
router.put("/:id", verifyToken, checkRole(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body; // ← CORREGIDO: "role" en lugar de "rol"
    
    console.log("📝 Actualizando usuario ID:", id);
    console.log("Nuevos datos:", { email, role });

    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // CORREGIDO: Solo email y role (sin "nombre")
    await user.update({ email, role });
    
    console.log("✅ Usuario actualizado correctamente");
    res.status(200).json({ 
      message: "Usuario actualizado correctamente",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error("❌ Error actualizando usuario:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
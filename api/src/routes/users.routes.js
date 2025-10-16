import express from "express";
import {Users} from "../model/Users.js";

const router = express.Router();
const validRoles = ['user', 'admin', 'trainer']
//todos los usuarios
router.get("/", async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});
//usuario por id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findByPk(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ error: "Error al obtener usuario" });
    }
});
//eliminar usuario
router.delete("/:id"), async (req, res) => {
    const {id} = req.params;
    try{
        await Users.destroy({where: {id}})
        res.status(204).send();
    } catch (error){
        res.status(500).json({error:error.message});
    }
}

//actualizar usuario
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
        await Users.update({ email }, { where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//crear usuario
router.post("/", async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!validRoles.includes(role)) {
            return res.status(400).json({ error: "Rol inválido" });
        }
        if (!email || !password || !role) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }
        const newUser = await Users.create({ email, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

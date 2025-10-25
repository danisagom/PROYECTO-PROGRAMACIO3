import bcrypt from "bcryptjs";
import Users from "../models/Users.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el usuario
    const newUser = await Users.create({
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      userId: newUser.id,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

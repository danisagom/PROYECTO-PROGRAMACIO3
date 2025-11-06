import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({
    where: { email },
  });
  if (!user) return res.status(401).send({ message: "usuario no existente" });
  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison)
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });

  const secretKey = "secret_key_594783";
  const token = jwt.sign({id:user.id, email, role: user.role }, secretKey, { expiresIn: "1h" });

  return res.json({ token, role: user.role });
};

import bcrypt from "bcryptjs";
import Users from "../models/Users.js";

export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  const user = await Users.findOne({
    where: { email },
  });
  if (user) return res.status(400).send({ message: "usuario existente" });

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await Users.create({
    email,
    role,
    password: hashedPassword,
  });
  res.json(newUser.id);
};

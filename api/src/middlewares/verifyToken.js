import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const header = req.header("authorization") || "";
  const token = header.split(" ")[1];
  if (!token)
    return res.status(400).send({ message: "No posee autorizacion requerida" });

  try {
    const payload = jwt.verify(token, "secret_key_594783");
    const user = await Users.findByPk(payload.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token invalido o expirado" });
  }
};

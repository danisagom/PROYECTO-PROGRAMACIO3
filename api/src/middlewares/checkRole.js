export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    if (!requiredRole.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "No tenés permisos para acceder a esta ruta" });
    }

    next();
  };
};

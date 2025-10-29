import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const secretKey = "secret_key_594783";
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

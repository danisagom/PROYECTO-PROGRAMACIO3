import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // AGREGAR ESTOS LOGS TEMPORALES:
  console.log("=== 🚨 DEBUG VERIFYTOKEN 🚨 ===");
  console.log("📍 URL:", req.originalUrl);
  console.log("🔍 Método:", req.method);
  console.log("📫 Authorization header:", authHeader);
  console.log("👤 Todos los headers:", JSON.stringify(req.headers, null, 2));
  
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    console.log("❌ ERROR: No hay token en el header Authorization");
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const secretKey = "secret_key_594783";
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    
    console.log("✅ TOKEN VÁLIDO");
    console.log("👤 Usuario decodificado:", decoded);
    console.log("=====================================");
    
    next();
  } catch (error) {
    console.log("❌ TOKEN INVÁLIDO:", error.message);
    console.log("=====================================");
    return res.status(403).json({ message: 'Token inválido' });
  }
};
import bcrypt from "bcryptjs";
import { sequelize } from "./db.js";
import Users from "./models/Users.js";

async function createAdmin() {
  try {
    await sequelize.sync();
    
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const adminUser = await Users.create({
      email: "admin@activeenergy.com",
      password: hashedPassword,
      role: "admin"
    });
    
    console.log("✅ Admin creado exitosamente:");
    console.log("Email: admin@activeenergy.com");
    console.log("Password: admin123");
    console.log("Role: admin");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creando admin:", error);
    process.exit(1);
  }
}

createAdmin();
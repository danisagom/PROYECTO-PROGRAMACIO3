import express from "express";
import routinesRoutes from "./routes/routines.routes.js";
import userRoutes from "./routes/users.routes.js";
import { sequelize } from "./db.js";
import { PORT } from "./config.js";
import cors from "cors";
const app = express();



app.use(express.json());
import authRoutes from "./routes/auth.routes.js";

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

app.use("/routines", routinesRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

async function main() {
  try {
    await sequelize.sync();
    console.log("Base de datos sincronizada correctamente.");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error en la inicialización:", error);
  }
}

main();

import express from "express";
import routinesRoutes from "./routes/routines.routes.js";
import userRoutes from "./routes/users.routes.js";
import { sequelize } from "./db.js";
import { PORT } from "./config.js";
import cors from "cors";
const app = express();



app.use(express.json());
app.use(cors(
));

app.use("/routines", routinesRoutes);
app.use("/users", userRoutes);

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

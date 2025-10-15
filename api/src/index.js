import express from "express";
import routinesRoutes from "./routes/routines.routes.js";
import { sequelize } from "./db.js";

const app = express();
const PORT = 4000;


app.use(express.json());


app.use("/routines", routinesRoutes);

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

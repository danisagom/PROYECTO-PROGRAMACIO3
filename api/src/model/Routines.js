import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


const Routines = sequelize.define("Routines", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  duracion: {
    type: DataTypes.INTEGER, // minutos aprox.
    allowNull: true
  },
  nivel: {
    type: DataTypes.STRING, // "principiante"|"intermedio"|"avanzado"
    allowNull: true
  },
  ejercicios: {
    type: DataTypes.TEXT, 
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false
});


export default Routines;

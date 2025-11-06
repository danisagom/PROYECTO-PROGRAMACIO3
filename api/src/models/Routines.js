import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Routines = sequelize.define('Routines', {
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
    type: DataTypes.INTEGER,
    allowNull: true
  },
  nivel: {
    type: DataTypes.ENUM('principiante', 'intermedio', 'avanzado'),
    allowNull: false
  },
  ejercicios: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

export default Routines;

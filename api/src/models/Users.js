import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'trainer', 'admin'),
    defaultValue: 'user'
  }
}, {
  timestamps: true
});

export default Users;

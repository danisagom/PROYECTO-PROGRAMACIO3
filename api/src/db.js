import { Sequelize } from 'sequelize';
import { DB_DIALECT, DB_STORAGE } from './config.js';

export const sequelize = new Sequelize({
  dialect: DB_DIALECT,
  storage: DB_STORAGE,
  logging: false,
});

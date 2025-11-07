import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Cart = sequelize.define("carts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  routineId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Cart;

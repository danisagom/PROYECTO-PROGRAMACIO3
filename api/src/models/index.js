//relacion entre rutinas y user

import Users from "./Users.js";
import Routines from "./Routines.js";
import Cart from "./Cart.js";

// Definir relaciones
Users.hasMany(Routines, { foreignKey: "userId" });
Routines.belongsTo(Users, { foreignKey: "userId" });
Users.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsTo(Users, { foreignKey: "userId" });
Routines.hasMany(Cart, { foreignKey: "routineId", as: "routinesCart" });
Cart.belongsTo(Routines, { foreignKey: "routineId", as: "routine" });

export { Users, Routines, Cart };

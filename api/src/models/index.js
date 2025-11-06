//relacion entre rutinas y user 

import Users from './Users.js';
import Routines from './Routines.js';

// Definir relaciones
Users.hasMany(Routines, { foreignKey: 'userId' });
Routines.belongsTo(Users, { foreignKey: 'userId' });

export { Users, Routines };

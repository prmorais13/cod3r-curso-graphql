const db = require('../config/db');

// Excluir por id
// db('usuarios')
//   .where({ id: 1 })
//   .delete()
//   .then(res => console.log(res))
// 	.finally(() => db.destroy());

// Excluir todos os registros
db('perfis')
  .delete()
  .then(res => console.log(res))
  .finally(() => db.destroy());

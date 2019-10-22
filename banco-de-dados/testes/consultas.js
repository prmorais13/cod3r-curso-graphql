const db = require('../config/db');

db('perfis')
  .map(p => p.nome)
  .then(nomes => console.log(nomes))

  .finally(() => db.destroy());

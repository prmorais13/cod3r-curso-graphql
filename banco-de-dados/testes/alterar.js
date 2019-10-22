const db = require('../config/db');

const novoUsuario = {
  nome: 'Diogo',
  email: 'diogo14@gmail.com',
  senha: '12345678'
};

async function exercicio() {
  const { Qtd } = await db('usuarios')
    .count('* as Qtd')
    .first();

  // Inserir
  if (Qtd === 0) {
    await db('usuarios').insert(novoUsuario);
  }

  // Consultar
  let { id } = await db('usuarios')
    .limit(1)
    .first();

  //Alterar
  await db('usuarios')
    .where({ id })
    .update({ nome: 'Diogo Gomes' });
  return await db('usuarios').where({ id });
}

exercicio()
  .then(usuario => console.log(usuario))
  .finally(() => db.destroy());

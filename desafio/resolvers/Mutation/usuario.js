const db = require('../../config/db');

module.exports = {
  async novoUsuario(_, { dados }) {
    const { email } = dados;
    const existente = await db('usuarios')
      .where({ email })
      .first();
    if (existente) {
      throw new Error('Usuário já cadastrado!');
    }

    let [id] = await db('usuarios').insert(dados);
    return await db('usuarios')
      .where({ id })
      .first()
      .catch(err => console.error(err.sqlMessage));
  },

  async excluirUsuario(_, { filtro }) {
    // Implementar
  },

  async alterarUsuario(_, { filtro, dados }) {
    const usuario = await db('usuarios')
      .where(filtro)
      .first();

    if (usuario) {
      await db('usuarios')
        .where(filtro)
        .update(dados);
    } else {
      throw new Error('Usuário não cadastrado!');
    }

    return await db('usuarios')
      .where(filtro)
      .first();
  }
};

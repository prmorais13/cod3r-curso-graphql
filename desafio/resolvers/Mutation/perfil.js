const db = require('../../config/db');

async function indicePerfil(filtro) {}

module.exports = {
  async novoPerfil(_, { dados }) {
    const { nome } = dados;
    const existente = await db('perfis')
      .where({ nome })
      .first();
    if (existente) {
      throw new Error('Perfil já cadastrado!');
    }

    let [id] = await db('perfis').insert(dados);
    return await db('perfis')
      .where({ id })
      .first()
      .catch(err => console.error(err.sqlMessage));
  },

  async excluirPerfil(_, { filtro }) {
    const perfil = await db('perfis')
      .where(filtro)
      .first();
    if (perfil) {
    }
    return perfil;
  },

  async alterarPerfil(_, { filtro, dados }) {
    const perfil = await db('perfis')
      .where(filtro)
      .first();

    if (perfil) {
      await db('perfis')
        .where(filtro)
        .update(dados);
    } else {
      throw new Error('Perfil não cadastrado!');
    }

    return await db('perfis')
      .where(filtro)
      .first();
  }
};

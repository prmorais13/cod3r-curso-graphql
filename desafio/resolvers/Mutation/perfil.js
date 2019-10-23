const db = require('../../config/db');
const { perfil: obeterPerfil } = require('../Query/perfil');

module.exports = {
  async novoPerfil(_, { dados }) {
    const { nome } = dados;
    const existente = await db('perfis')
      .where({ nome })
      .first();

    if (existente) {
      throw new Error('Perfil já cadastrado!');
    }

    try {
      let [id] = await db('perfis').insert(dados);

      return await db('perfis')
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  },

  async excluirPerfil(_, { filtro }) {
    try {
      const perfil = await obeterPerfil(_, { filtro });

      if (perfil) {
        const { id } = perfil;

        await db('usuarios_perfis')
          .where({ perfil_id: id })
          .delete();
        await db('perfis')
          .where({ id })
          .delete();
        console.log(perfil);
      }
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
    console.log(perfil);
    /// return perfil;
  },

  async alterarPerfil(_, { filtro, dados }) {
    const perfil = await obeterPerfil(_, { filtro });

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

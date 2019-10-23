const db = require('../../config/db');
const { perfil: obeterPerfil } = require('../Query/perfil');
const { usuario: obeterUsuario } = require('../Query/usuario');

module.exports = {
  async novoUsuario(_, { dados }) {
    const { email } = dados;
    const existente = await db('usuarios')
      .where({ email })
      .first();

    if (existente) {
      throw new Error('Usuário já cadastrado!');
    }

    try {
      const idsPerfis = [];

      if (dados.perfis) {
        for (let filtro of dados.perfis) {
          const perfil = await obeterPerfil(_, { filtro });
          if (perfil) {
            idsPerfis.push(perfil.id);
          }
        }
      }

      delete dados.perfis;

      const [usuario_id] = await db('usuarios').insert(dados);

      for (perfil_id of idsPerfis) {
        await db('usuarios_perfis').insert({ perfil_id, usuario_id });
      }

      return await db('usuarios')
        .where({ id: usuario_id })
        .first();
    } catch (error) {
      throw new Error(error);
    }
  },

  async excluirUsuario(_, { filtro }) {
    try {
      const usuario = await obeterUsuario(_, { filtro });

      if (usuario) {
        const { id } = usuario;

        await db('usuarios_perfis')
          .where({ usuario_id: id })
          .delete();
        await db('usuarios')
          .where({ id })
          .delete();

        return usuario;
      }
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  },

  async alterarUsuario(_, { filtro, dados }) {
    try {
      const usuario = await obeterUsuario(_, { filtro });

      if (usuario) {
        const { id } = usuario;

        if (dados.perfis) {
          await db('usuarios_perfis')
            .where({ usuario_id: id })
            .delete();

          for (let filtro of dados.perfis) {
            const perfil = await obeterPerfil(_, { filtro });

            if (perfil) {
              await db('usuarios_perfis').insert({
                perfil_id: perfil.id,
                usuario_id: id
              });
            }
          }
        }

        delete dados.perfis;

        await db('usuarios')
          .where({ id })
          .update(dados);
      }

      return !usuario ? null : { ...usuario, ...dados };
    } catch (error) {
      throw new Error(error);
    }
  }
};

const db = require('../../config/db');

module.exports = {
  async perfis() {
    return await db('perfis');
  },

  async perfil(_, { filtro }) {
    if (!filtro) return null;

    const { id, nome } = filtro;

    if (id) {
      return await db('perfis')
        .where({ id })
        .first();
    } else if (nome) {
      return await db('perfis')
        .where({ nome })
        .first();
    } else {
      return null;
    }

    // return await db('perfis')
    //   .where(filtro)
    //   .first()
    //   .catch(err => console.err(err.sqlMessage));
    //   .finally(() => db.destroy());
  }
};

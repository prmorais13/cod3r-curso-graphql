const db = require('../../config/db');

module.exports = {
  async perfis() {
    return await db('perfis').catch(err => console.err(err.sqlMessage));
    // .finally(() => db.destroy());
  },
  async perfil(_, { filtro }) {
    if (!filtro) return null;

    const { id, nome } = filtro;
    if (id) {
      return await db('perfis')
        .where({ id })
        .first()
        .catch(err => console.err(err.sqlMessage));
    } else if (nome) {
      return await db('perfis')
        .where({ nome })
        .first()
        .catch(err => console.err(err.sqlMessage));
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

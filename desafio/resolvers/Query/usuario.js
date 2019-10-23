const db = require('../../config/db');

module.exports = {
  async usuarios() {
    return await db('usuarios').catch(err => console.err(err));
  },
  async usuario(_, { filtro }) {
    if (!filtro) return null;

    const { id, email } = filtro;
    if (id) {
      return await db('usuarios')
        .where({ id })
        .first()
        .catch(err => console.err(err.sqlMessage));
    } else if (email) {
      return await db('usuarios')
        .where({ email })
        .first()
        .catch(err => console.err(err.sqlMessage));
    } else {
      return null;
    }

    // return await db('usuarios')
    //   .where(filtro)
    //   .first()
    //   .catch(err => console.err(err.sqlMessage));
  }
};

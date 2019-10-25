const jwt = require('jwt-simple');
const { perfis: obterPerfis } = require('../Type/Usuario');

module.exports = {
  async getUsuarioLogado(usuario) {
    const perfis = await obterPerfis(usuario);
    const dataAtual = Math.floor(Date.now() / 1000); // Data em segundos

    const usuarioInfo = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfis: perfis.map(p => p.nome),
      iat: dataAtual,
      exp: dataAtual + 3 * 24 * 60 * 60
    };

    const authSecret = process.env.APP_AUTH_SECRET;

    return {
      ...usuarioInfo,
      token: jwt.encode(usuarioInfo, authSecret)
    };
  }
};

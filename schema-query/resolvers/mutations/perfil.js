const { perfis, proximoId } = require('../../data/db');

indiceFiltro = filtro => {
  if (!filtro) return -1;

  const { id, nome } = filtro;
  if (id) {
    return perfis.findIndex(f => f.id === id);
  } else {
    return perfis.findIndex(f => f.nome === nome);
  }

  return -1;
};

module.exports = {
  novoPerfil(_, { dados }) {
    const nomeExistente = perfis.some(f => f.nome === dados.nome);
    if (nomeExistente) {
      throw new Error('Perfil já cadastrado!');
    }

    const novo = {
      id: proximoId(),
      ...dados
    };

    perfis.push(novo);
    return novo;
  }
};

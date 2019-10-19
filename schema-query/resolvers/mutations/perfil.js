const { perfis, proximoId } = require('../../data/db');

function indicePerfil(filtro) {
  if (!filtro) return -1;

  const { id, nome } = filtro;

  if (id) {
    return perfis.findIndex(p => p.id === id);
  } else {
    return perfis.findIndex(p => p.nome === nome);
  }

  return -1;
}

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
  },

  alterarPerfil(_, { filtro, dados }) {
    const i = indicePerfil(filtro);
    if (i < 0) return null;

    const perfil = {
      ...perfis[i],
      ...dados
    };

    perfis.splice(i, 1, perfil);
    return perfil;
  },

  excluirPerfil(_, { filtro }) {
    const i = indicePerfil(filtro);
    if (i < 0) return null;

    const excluidos = perfis.splice(i, 1);
    return excluidos ? excluidos[0] : null;
  }
};

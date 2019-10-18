const { perfis, usuarios } = require('../data/db');

module.exports = {
  ola() {
    return 'Boa noite';
  },

  horaAtual() {
    return new Date();
  },

  usuarioLogado() {
    return {
      id: 1,
      nome: 'Maria Fernanda',
      email: 'nanda04@gmail.com',
      idade: 4,
      salario_real: 5970.65,
      vip: true
    };
  },

  produtoEmDestaque() {
    return {
      id: 2,
      nome: 'Picanha',
      preco: 56.25,
      desconto: 0
    };
  },

  numerosMegaSena() {
    return [4, 6, 9, 11, 13, 14];
  },

  todosUsuarios() {
    return usuarios;
  },

  usuario(_, args) {
    const selecionado = usuarios.filter(u => u.id === args.id);
    return selecionado ? selecionado[0] : null;
  },

  perfis() {
    return perfis;
  },

  perfil(_, { id }) {
    const selecionado = perfis.filter(p => p.id === id);
    return selecionado ? selecionado[0] : null;
  }
};

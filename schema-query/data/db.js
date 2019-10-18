const usuarios = [
  {
    id: 1,
    nome: 'Maria Fernanda',
    email: 'nanda04@gmail.com',
    idade: 4,
    salario_real: 5970.65,
    vip: true,
    perfil_id: 2,
    status: 'ATIVO'
  },
  {
    id: 2,
    nome: 'Paulo Roberto',
    email: 'prmorais1302@gmail.com',
    idade: 58,
    salario_real: 7970.65,
    vip: true,
    perfil_id: 1,
    status: 'ATIVO'
  },
  {
    id: 3,
    nome: 'Ana Paula',
    email: 'ana09@gmail.com',
    idade: 28,
    salario_real: 3970.65,
    vip: true,
    perfil_id: 2,
    status: 'INATIVO'
  }
];

const perfis = [
  {
    id: 1,
    nome: 'Comum'
  },
  {
    id: 2,
    nome: 'Administrador'
  }
];

module.exports = { usuarios, perfis };

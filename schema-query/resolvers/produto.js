module.exports = {
  precoDesconto(produto) {
    if (produto.preco) {
      return produto.preco * (1 - produto.desconto);
    } else {
      produto.preco;
    }
  }
};

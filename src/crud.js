const form = document.getElementById('formProduto');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
  document.getElementById('titulo').textContent = "Editar Produto";

  window.api.produtos.buscarPorId(parseInt(id)).then(produto => {
    document.getElementById('nome').value = produto.nome;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('estoque').value = produto.estoque;
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const produto = {
    nome: document.getElementById('nome').value,
    preco: parseFloat(document.getElementById('preco').value),
    estoque: parseInt(document.getElementById('estoque').value)
  };

  if (id) {
    produto.id = parseInt(id);
    window.api.produtos.atualizar(produto).then(() => {
      window.location.href = 'index.html';
    });
  } else {
    window.api.produtos.criar(produto).then(() => {
      window.location.href = 'index.html';
    });
  }
});

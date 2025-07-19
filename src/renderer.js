const lista = document.getElementById("produtos");
const carrinhoEl = document.getElementById("carrinho");
const totalEl = document.getElementById("total");
const quantidadeEl = document.getElementById("quantidade");

let carrinho = [];

function renderizarProdutos() {
  window.api.produtos.listar().then((produtos) => {
    lista.innerHTML = "";
    produtos.forEach((produto) => {
      const li = document.createElement("li");

      const nomeSpan = document.createElement("span");
      nomeSpan.textContent = `${produto.nome} - R$${produto.preco}`;
      nomeSpan.classList.add("produto-nome");

      const btnAdd = document.createElement("button");
      btnAdd.textContent = "Adicionar";
      btnAdd.classList.add("btn-adicionar"); // Classe para estilizar
      btnAdd.onclick = () => adicionarAoCarrinho(produto);

      const btnDel = document.createElement("button");
      btnDel.textContent = "Excluir Produto";
      btnDel.classList.add("btn-excluir"); // Classe para estilizar
      btnDel.onclick = () => {
        window.api.produtos.deletar(produto.id).then(renderizarProdutos);
      };

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("botoes");
      btnContainer.appendChild(btnAdd);
      btnContainer.appendChild(btnDel);

      li.appendChild(nomeSpan);
      li.appendChild(btnContainer);
      lista.appendChild(li);
    });
  });
}

function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  renderizarCarrinho();
}

function renderizarCarrinho() {
  carrinhoEl.innerHTML = "";
  let total = 0;
  
  carrinho.forEach((item) => {
    total += item.preco;
    const li = document.createElement("li");
    li.textContent = item.nome + " - R$" + item.preco;
    carrinhoEl.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
  quantidadeEl.textContent = carrinho.length; // Atualiza a quantidade de itens
}


renderizarProdutos();

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
      nomeSpan.textContent = `${produto.nome} - ${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
      nomeSpan.classList.add("produto-nome");

      const btnAdd = document.createElement("button");
      btnAdd.textContent = "Adicionar";
      btnAdd.classList.add("btn-adicionar");
      btnAdd.onclick = () => adicionarAoCarrinho(produto);

      const btnEdit = document.createElement("button");
      btnEdit.textContent = "Editar";
      btnEdit.classList.add("btn-editar");
      btnEdit.onclick = () => {
        // Redireciona para crud.html com o id do produto para editar
        window.location.href = `crud.html?id=${produto.id}`;
      };

      const btnDel = document.createElement("button");
      btnDel.textContent = "Excluir Produto";
      btnDel.classList.add("btn-excluir");
      btnDel.onclick = () => {
        window.api.produtos.deletar(produto.id).then(renderizarProdutos);
      };

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("botoes");
      btnContainer.appendChild(btnAdd);
      btnContainer.appendChild(btnEdit);
      btnContainer.appendChild(btnDel);

      li.appendChild(nomeSpan);
      li.appendChild(btnContainer);
      lista.appendChild(li);
    });
  });
}



function adicionarAoCarrinho(produto) {
  const existente = carrinho.find(item => item.id === produto.id);
  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({...produto, quantidade: 1});
  }
  renderizarCarrinho();
}

function renderizarCarrinho() {
  carrinhoEl.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;

    const li = document.createElement("li");
    li.classList.add("item-carrinho");

    const nomeSpan = document.createElement("span");
    nomeSpan.textContent = `${item.nome} - ${item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    nomeSpan.classList.add("nome-item");

    // Input para alterar quantidade
    const inputQtd = document.createElement("input");
    inputQtd.type = "number";
    inputQtd.min = 1;
    inputQtd.value = item.quantidade;
    inputQtd.classList.add("input-quantidade");
    inputQtd.onchange = (e) => {
      const novaQtd = parseInt(e.target.value);
      if (novaQtd > 0) {
        carrinho[index].quantidade = novaQtd;
      } else {
        carrinho.splice(index, 1); // Remove se for 0 ou inválido
      }
      renderizarCarrinho();
    };

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover da Lista";
    btnRemover.classList.add("btn-remover");
    btnRemover.onclick = () => {
      carrinho.splice(index, 1);
      renderizarCarrinho();
    };

    li.appendChild(nomeSpan);
    li.appendChild(inputQtd);
    li.appendChild(btnRemover);
    carrinhoEl.appendChild(li);
  });

  totalEl.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  quantidadeEl.textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
}


 function removerDoCarrinho(index) {
  carrinho.splice(index, 1); // usa indice para remover 
  renderizarCarrinho();

 }
renderizarProdutos();
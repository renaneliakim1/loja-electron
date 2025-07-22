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
      nomeSpan.textContent = `${produto.nome} - ${produto.preco.toLocaleString(
        "pt-BR",
        { style: "currency", currency: "BRL" }
      )} | Estoque: ${produto.estoque}`;
      nomeSpan.classList.add("produto-nome");

      const btnAdd = document.createElement("button");
      btnAdd.textContent = "Adicionar ao Carrinho";
      btnAdd.classList.add("btn-adicionar");
      btnAdd.onclick = () => adicionarAoCarrinho(produto);

      const btnEdit = document.createElement("button");
      btnEdit.textContent = "Editar";
      btnEdit.classList.add("btn-editar");
      btnEdit.onclick = () => {
        window.location.href = `crud.html?id=${produto.id}`;
      };

      const btnDel = document.createElement("button");
      btnDel.textContent = "Excluir";
      btnDel.classList.add("btn-excluir");
      btnDel.onclick = () => {
        window.api.produtos.deletar(produto.id).then(renderizarProdutos);
      };

      li.appendChild(nomeSpan);
      li.appendChild(btnAdd);
      li.appendChild(btnEdit);
      li.appendChild(btnDel);

      lista.appendChild(li);
    });
  });
}

function adicionarAoCarrinho(produto) {
  const existente = carrinho.find((item) => item.id === produto.id);

  if (existente) {
    if (existente.quantidade < produto.estoque) {
      existente.quantidade++;
    } else {
      alert(
        `Estoque insuficiente! Só há ${produto.estoque} unidades de ${produto.nome}.`
      );
    }
  } else {
    if (produto.estoque > 0) {
      carrinho.push({ ...produto, quantidade: 1 });
    } else {
      alert(`O produto ${produto.nome} está esgotado.`);
    }
  }

  renderizarCarrinho();
}

function renderizarCarrinho() {
  carrinhoEl.innerHTML = "";
  let total = 0;
  let totalItens = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;
    totalItens += item.quantidade;

    const li = document.createElement("li");
    li.classList.add("item-carrinho");

    const nomeSpan = document.createElement("span");
    nomeSpan.textContent = `${item.nome} - ${item.preco.toLocaleString(
      "pt-BR",
      { style: "currency", currency: "BRL" }
    )} x ${item.quantidade}`;
    nomeSpan.classList.add("nome-item");

    const btnDiminuir = document.createElement("button");
    btnDiminuir.textContent = "-";
    btnDiminuir.onclick = () => {
      if (item.quantidade > 1) {
        item.quantidade--;
      } else {
        carrinho.splice(index, 1);
      }
      renderizarCarrinho();
    };

    const btnAumentar = document.createElement("button");
    btnAumentar.textContent = "+";
    btnAumentar.onclick = () => {
      const existente = carrinho.find((c) => c.id === item.id);

      if (existente.quantidade < item.estoque) {
        existente.quantidade++;
      } else {
        alert(
          `Limite de estoque atingido! Estoque disponível de ${item.nome}: ${item.estoque}`
        );
      }

      renderizarCarrinho();
    };

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover da Lista";
    btnRemover.onclick = () => {
      carrinho.splice(index, 1);
      renderizarCarrinho();
    };

    li.appendChild(nomeSpan);
    li.appendChild(btnDiminuir);
    li.appendChild(btnAumentar);
    li.appendChild(btnRemover);
    carrinhoEl.appendChild(li);
  });

  totalEl.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  quantidadeEl.textContent = totalItens;
}

renderizarProdutos();



// Array que guarda os produtos adicionados
let carrinho = [];

// Delegação de eventos para os botões "Adicionar ao Carrinho"
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("adicionar-carrinho")) {
    const botao = e.target;
    const id = botao.dataset.produtoId;
    const nome = botao.dataset.nome;
    const preco = parseFloat(botao.dataset.preco);

    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find((item) => item.id == id);
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinho.push({ id, nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
  }
});

// Função para mostrar o modal do carrinho
function mostrarCarrinho() {
  atualizarCarrinho();
  var carrinhoModal = new bootstrap.Modal(
    document.getElementById("carrinhoModal")
  );
  carrinhoModal.show();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total-carrinho");
  const contador = document.getElementById("contador-carrinho");

  lista.innerHTML = "";
  let total = 0;
  let totalItens = 0;

  carrinho.forEach((item) => {
    total += item.preco * item.quantidade;
    totalItens += item.quantidade;

    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    li.innerHTML = `
      <div>
        <strong>${item.nome}</strong><br>
        R$ ${item.preco.toFixed(2)} x ${item.quantidade}
      </div>
      <button class="btn btn-danger btn-sm">Excluir</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      carrinho = carrinho.filter((prod) => prod.id != item.id);
      atualizarCarrinho();
    });

    lista.appendChild(li);
  });

  totalEl.textContent = `R$ ${total.toFixed(2)}`;

  // 🔹 Atualiza badge do carrinho
  if (contador) {
    contador.textContent = totalItens;
    contador.style.display = totalItens > 0 ? "inline-block" : "none";
  }
}
// Seleciona o botão "Finalizar Compra"
const finalizarBtn = document.querySelector("#carrinhoModal .btn-primary");

// Evento de clique no botão "Finalizar Compra"
finalizarBtn.addEventListener("click", () => {
  // Aqui você precisa definir como vai verificar se o usuário está logado.
  // Exemplo simples: usando localStorage
  const usuarioLogado = localStorage.getItem("usuarioLogado"); 

  if (usuarioLogado) {
    // Usuário logado → redireciona para pagamento
    window.location.href = "pagamentos.html";
  } else {
    // Usuário não logado → redireciona para login
    window.location.href = "login.html";
  }
});

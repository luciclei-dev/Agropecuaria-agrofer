// Exemplo simples de login
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Aqui você faria a validação real com backend
  if (email === "lucicleibd10oliveira@gmail.com" && senha === "123456") {
    localStorage.setItem("usuarioLogado", "true");
    alert("Login realizado com sucesso!");
    window.location.href = "pagamentos.html"; // redireciona para a página inicial
  } else {
    alert("Email ou senha incorretos!");
  }
});

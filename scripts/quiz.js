let numero1, numero2, resultado, operacao, selecionaop;

// Função para iniciar o quiz ou reiniciá-lo
function iniciarQuiz() {
  // Gera dois números aleatórios entre 1 e 6
  numero1 = Math.floor(Math.random() * 100) + 1;
  numero2 = Math.floor(Math.random() * 100) + 1;

  // Lista de operações
  operacao = ["+", "-", "/", "*"];

  // Seleciona uma operação aleatória
  selecionaop = Math.floor(Math.random() * 4);

  // Exibe os números e a operação
  document.getElementById('intext1').value = numero1;
  document.getElementById('intext2').value = numero2;
  document.getElementById('operacoes').innerText = operacao[selecionaop];

  // Calcula o resultado com base na operação selecionada
  if (selecionaop === 0) {  
    resultado = numero1 + numero2;
  } else if (selecionaop === 1) {
    resultado = numero1 - numero2;
  } else if (selecionaop === 2) {
    resultado = numero1 / numero2;
  } else if (selecionaop === 3) {
    resultado = numero1 * numero2;
  }

  // Limpa o campo de resposta e a mensagem anterior
  document.getElementById('intext').value = '';
  document.getElementById('respostas').innerText = '';
}

// Função para verificar a resposta do usuário
function verificaresposta() {
  let respostaUsuario = document.getElementById('intext').value;

  // Compara a resposta do usuário com o resultado
  if (Number(respostaUsuario) === resultado) {
    document.getElementById('respostas').innerText = "Correto!";
  } else {
    document.getElementById('respostas').innerText = "Incorreto. A resposta correta é: " + resultado;
  }
}

// Função para reiniciar o quiz
function reiniciarQuiz() {
  iniciarQuiz(); // Chama a função para iniciar um novo quiz
}

// Inicia o quiz automaticamente ao carregar a página
iniciarQuiz();

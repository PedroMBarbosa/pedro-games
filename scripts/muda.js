document.getElementById("botao-cor").addEventListener("click", function() {

	//Altera a cor do fundo
	document.getElementById("fundo").classList.toggle("fundo2")

    // Alterna a classe do cabeçalho
    document.getElementById("cabecario").classList.toggle("cabecario2");
    document.getElementById("titulo").classList.toggle("titulo2");

    // Alterna a classe do container
    document.getElementById("container").classList.toggle("container2");


    //Alterna o nome no rodapé
    document.getElementById("nome").classList.toggle("nome2")

    // Lista de IDs dos jogos
    const jogos = [
        "cobrinha", "alvo", "pong", "flybird",
        "memoria", "velha", "quiz", "space",
        "pedra", "pulo"
    ];

    // Alterna a classe de todos os nomes dos jogos
    jogos.forEach(function(id) {
        document.getElementById(id).classList.toggle("nome-jogo2");
    });
});

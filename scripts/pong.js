// Variáveis para o menu e canvas
const menu = document.getElementById("menu");
const canvas = document.getElementById("pongGame");
const ctx = canvas.getContext("2d");

// Botões para selecionar o modo de jogo
const onePlayerBtn = document.getElementById("onePlayerBtn");
const twoPlayersBtn = document.getElementById("twoPlayersBtn");

// Variáveis do jogo
let player1 = { x: 10, y: canvas.height / 2 - 50, width: 10, height: 100, dy: 0 };
let player2 = { x: canvas.width - 20, y: canvas.height / 2 - 50, width: 10, height: 100, dy: 0 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 7, dx: 5, dy: 5 };
let gameMode = ""; // Armazena o modo de jogo (1P ou 2P)

// Velocidade dos paddles
const paddleSpeed = 8;

// Pontuação
let score1 = 0; // Jogador 1
let score2 = 0; // Jogador 2

// Pontuação máxima antes de reiniciar
const maxScore = 5;

// Função para iniciar o jogo
function startGame(mode) {
    menu.style.display = "none"; // Oculta o menu
    canvas.style.display = "block"; // Exibe o canvas
    gameMode = mode; // Define o modo de jogo (1P ou 2P)
    score1 = 0; // Reinicia a pontuação
    score2 = 0;
    resetBall(); // Reseta a posição da bola
    requestAnimationFrame(updateGame); // Inicia o loop do jogo
}

// Função para resetar a bola
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = 5 * (Math.random() > 0.5 ? 1 : -1);
}

// Atualiza o loop do jogo
function updateGame() {
    movePaddles();
    moveBall();
    drawEverything();

    // Verifica se alguém atingiu a pontuação máxima
    if (score1 >= maxScore || score2 >= maxScore) {
        endGame(); // Encerra o jogo e volta para o menu
    } else {
        requestAnimationFrame(updateGame); // Continua o loop do jogo
    }
}

// Move os paddles
function movePaddles() {
    // Controle do Jogador 1
    player1.y += player1.dy;
    if (player1.y < 0) player1.y = 0;
    if (player1.y + player1.height > canvas.height) player1.y = canvas.height - player1.height;

    // Controle do Jogador 2 (IA mais lenta no modo 1P)
    if (gameMode === "2P") {
        player2.y += player2.dy;
        if (player2.y < 0) player2.y = 0;
        if (player2.y + player2.height > canvas.height) player2.y = canvas.height - player2.height;
    } else {
        // IA mais lenta para facilitar
        const aiSpeed = paddleSpeed * 0.3; // IA 40% mais lenta
        if (ball.y < player2.y + player2.height / 2) {
            player2.dy = -aiSpeed;
        } else {
            player2.dy = aiSpeed;
        }
        player2.y += player2.dy;
    }
}

// Move a bola
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Colisão da bola com o topo e o fundo
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }

    // Colisão da bola com os paddles
    if (
        ball.x - ball.radius < player1.x + player1.width &&
        ball.y > player1.y &&
        ball.y < player1.y + player1.height
    ) {
        ball.dx = -ball.dx;
    }
    if (
        ball.x + ball.radius > player2.x &&
        ball.y > player2.y &&
        ball.y < player2.y + player2.height
    ) {
        ball.dx = -ball.dx;
    }

    // Verifica se a bola saiu da tela e adiciona um ponto
    if (ball.x - ball.radius < 0) {
        score2++; // Jogador 2 marca ponto
        resetBall();
    }
    if (ball.x + ball.radius > canvas.width) {
        score1++; // Jogador 1 marca ponto
        resetBall();
    }
}

// Função para desenhar tudo
function drawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha os jogadores
    ctx.fillStyle = "#fff";
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

    // Desenha a bola
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Desenha a pontuação
    ctx.font = "30px Arial";
    ctx.fillText(score1, canvas.width / 4, 30); // Pontuação do Jogador 1
    ctx.fillText(score2, (3 * canvas.width) / 4, 30); // Pontuação do Jogador 2
}

// Função para finalizar o jogo
function endGame() {
    // Exibe o menu novamente
    menu.style.display = "block";
    canvas.style.display = "none";
}

// Event listeners para os botões
onePlayerBtn.addEventListener("click", () => startGame("1P"));
twoPlayersBtn.addEventListener("click", () => startGame("2P"));

// Controles dos jogadores
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") player2.dy = -paddleSpeed;
    if (e.key === "ArrowDown") player2.dy = paddleSpeed;
    if (e.key === "w") player1.dy = -paddleSpeed;
    if (e.key === "s") player1.dy = paddleSpeed;
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") player2.dy = 0;
    if (e.key === "w" || e.key === "s") player1.dy = 0;
});

// Cores usadas no jogo
const BRANCO = "#FFFFFF";
const PRETO = "#000000";
const VERMELHO = "#FF0000";

// Dimensões da tela
const LARGURA_TELA = 400;
const ALTURA_TELA = 400;
const TAMANHO_ALVO = 50;

// Posição inicial da arma
let arma_x = LARGURA_TELA / 2;
let arma_y = ALTURA_TELA / 2;

// Variáveis de controle
let angulo_arma = 0;
let tiros = 15;
const tiro_inicial = 15;
let pontuacao = 0;
let balas = [];

// Cria a tela (canvas)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define a posição inicial do alvo
let alvo_x = Math.random() * (LARGURA_TELA - TAMANHO_ALVO);
let alvo_y = Math.random() * (ALTURA_TELA - TAMANHO_ALVO);

// Função para desenhar o alvo
function desenharAlvo() {
    ctx.fillStyle = VERMELHO;
    ctx.fillRect(alvo_x, alvo_y, TAMANHO_ALVO, TAMANHO_ALVO);
}

// Função para desenhar a arma
function desenharArma() {
    ctx.strokeStyle = BRANCO;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(arma_x, arma_y);
    ctx.lineTo(
        arma_x + TAMANHO_ALVO * Math.cos(angulo_arma),
        arma_y + TAMANHO_ALVO * Math.sin(angulo_arma)
    );
    ctx.stroke();
}

// Função para atualizar o ângulo da arma conforme o movimento do mouse
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    angulo_arma = Math.atan2(mouseY - arma_y, mouseX - arma_x);
});

// Função para atirar
canvas.addEventListener('mousedown', (e) => {
    if (tiros > 0 && e.button === 0) {  // Botão esquerdo do mouse
        const bala = {
            x: arma_x,
            y: arma_y,
            velX: Math.cos(angulo_arma) * 10,
            velY: Math.sin(angulo_arma) * 10,
            tamanho: 10
        };
        balas.push(bala);
        tiros--;
    }
});

// Função para desenhar as balas
function desenharBalas() {
    balas.forEach((bala) => {
        ctx.fillStyle = BRANCO;
        ctx.fillRect(bala.x, bala.y, bala.tamanho, bala.tamanho);
    });
}

// Função para atualizar as balas (movimento e colisão)
function atualizarBalas() {
    balas = balas.filter((bala) => {
        bala.x += bala.velX;
        bala.y += bala.velY;

        // Remover a bala se sair da tela
        if (bala.x < 0 || bala.x > LARGURA_TELA || bala.y < 0 || bala.y > ALTURA_TELA) {
            return false;
        }

        // Verifica colisão com o alvo
        if (bala.x < alvo_x + TAMANHO_ALVO && bala.x + bala.tamanho > alvo_x &&
            bala.y < alvo_y + TAMANHO_ALVO && bala.y + bala.tamanho > alvo_y) {
            pontuacao++;
            // Reposiciona o alvo
            alvo_x = Math.random() * (LARGURA_TELA - TAMANHO_ALVO);
            alvo_y = Math.random() * (ALTURA_TELA - TAMANHO_ALVO);
            return false;
        }

        return true;
    });
}

// Função para desenhar as informações do jogo (pontuação, tiros)
function desenharInfo() {
    ctx.fillStyle = BRANCO;
    ctx.font = '20px Arial';
    ctx.fillText(`Tiros restantes: ${tiros}`, 10, 30);
    ctx.fillText(`Pontuação: ${pontuacao}`, 10, 60);

    if (tiros === 0) {
        ctx.font = '24px Arial';
        ctx.fillText(`Você acertou: ${pontuacao} de ${tiro_inicial}`, 80, 120);
    }
}

// Função principal do jogo
function gameLoop() {
    ctx.clearRect(0, 0, LARGURA_TELA, ALTURA_TELA);
    ctx.fillStyle = PRETO;
    ctx.fillRect(0, 0, LARGURA_TELA, ALTURA_TELA);

    desenharAlvo();
    desenharArma();
    desenharBalas();
    desenharInfo();

    atualizarBalas();

    requestAnimationFrame(gameLoop);
}

// Inicializa o loop do jogo
gameLoop();

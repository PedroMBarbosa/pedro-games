// Constantes da janela
const larguraJanela = 600;
const alturaJanela = 600;

// Cores
const BRANCO = "#FFFFFF";
const PRETO = "#000000";
const AZUL = "#0000FF";
const AMARELO = "#FFFF00";

// Configurações iniciais
let pontuacao = 0;
let xCabecaCobra = 275;
let yCabecaCobra = 275;
let delay = 120;
const posicoesComidasX = Array.from({ length: 24 }, (_, i) => i * 25);
const posicoesComidasY = Array.from({ length: 22 }, (_, i) => i * 25 + 50);
let xComida = 300;
let yComida = 300;
const xCauda = Array(600).fill(0);
const yCauda = Array(600).fill(0);
let tamanho = 2;
let direita = false;
let esquerda = false;
let cima = false;
let baixo = false;

// Inicializando o canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Funções de desenho
function coresDaJanela() {
    ctx.fillStyle = BRANCO;
    ctx.fillRect(0, 0, larguraJanela, alturaJanela);
}

function desenharPainel() {
    ctx.fillStyle = PRETO;
    ctx.fillRect(0, 0, larguraJanela, 50);
    ctx.fillStyle = BRANCO;
    ctx.font = "20px Arial";
    ctx.fillText(`Use as setas ou WASD para mover || Pontuação atual: ${pontuacao}`, 10, 30);
}

function desenharCabecaCobra() {
    ctx.fillStyle = AZUL;
    ctx.fillRect(xCabecaCobra, yCabecaCobra, 25, 25);
}

function direcionarCobra(event) {
    if (event.key === "ArrowRight" || event.key === "d") {
        direita = true;
        esquerda = cima = baixo = false;
    } else if (event.key === "ArrowLeft" || event.key === "a") {
        esquerda = true;
        direita = cima = baixo = false;
    } else if (event.key === "ArrowUp" || event.key === "w") {
        cima = true;
        direita = esquerda = baixo = false;
    } else if (event.key === "ArrowDown" || event.key === "s") {
        baixo = true;
        direita = esquerda = cima = false;
    }
}

function moverCobra() {
    if (direita) xCabecaCobra += 25;
    else if (esquerda) xCabecaCobra -= 25;
    if (cima) yCabecaCobra -= 25;
    else if (baixo) yCabecaCobra += 25;
}

function cobraBateuParede() {
    return xCabecaCobra >= larguraJanela || xCabecaCobra < 0 || yCabecaCobra >= alturaJanela || yCabecaCobra < 50;
}

function reiniciar() {
    if (cobraBateuParede() || cobraSeMordeu()) {
        xCabecaCobra = 275;
        yCabecaCobra = 275;
        baixo = direita = esquerda = cima = false;
        tamanho = 2;
        pontuacao = 0;
    }
}

function cobraComeuComida() {
    return xCabecaCobra === xComida && yCabecaCobra === yComida;
}

function sortearPosicaoComida() {
    if (cobraComeuComida()) {
        xComida = posicoesComidasX[Math.floor(Math.random() * posicoesComidasX.length)];
        yComida = posicoesComidasY[Math.floor(Math.random() * posicoesComidasY.length)];
        tamanho++;
    }
}

function desenharComida() {
    ctx.fillStyle = AMARELO;
    ctx.beginPath();
    ctx.ellipse(xComida + 12.5, yComida + 12.5, 12.5, 12.5, 0, 0, Math.PI * 2);
    ctx.fill();
}

function atualizarPosicoesCobra() {
    xCauda[0] = xCabecaCobra;
    yCauda[0] = yCabecaCobra;
    for (let i = 599; i > 0; i--) {
        xCauda[i] = xCauda[i - 1];
        yCauda[i] = yCauda[i - 1];
    }
}

function desenharCaudaCobra() {
    for (let i = 0; i < tamanho; i++) {
        ctx.fillStyle = AZUL;
        ctx.fillRect(xCauda[i], yCauda[i], 25, 25);
    }
}

function atualizarPontuacao() {
    pontuacao = tamanho - 2;
}

function cobraSeMordeu() {
    for (let i = 1; i < tamanho; i++) {
        if (xCabecaCobra === xCauda[i] && yCabecaCobra === yCauda[i]) {
            return true;
        }
    }
    return false;
}

// Loop principal do jogo
function main() {
    coresDaJanela();
    desenharPainel();
    atualizarPosicoesCobra();
    moverCobra();
    atualizarPontuacao();
    reiniciar();
    desenharComida();
    desenharCabecaCobra();
    desenharCaudaCobra();
    sortearPosicaoComida();

    setTimeout(main, delay);
}

// Inicializando o loop do jogo e eventos de teclado
document.addEventListener("keydown", direcionarCobra);
main();

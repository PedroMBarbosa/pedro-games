// Seleciona o canvas e o contexto 2D
const canvas = document.getElementById('Space');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Propriedades da nave do jogador
const player = {
  width: 40,
  height: 20,
  x: canvasWidth / 2 - 20,
  y: canvasHeight - 30,
  speed: 5,
  movingLeft: false,
  movingRight: false,
  life: 3 // Vida do jogador
};

// Pontuação do jogador
let score = 0;

// Função para desenhar a nave do jogador
function drawPlayer() {
  ctx.fillStyle = 'white';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Função para desenhar a barra de vida
function drawLife() {
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 10, player.life * 40, 10); // Barra de vida no canto superior esquerdo
}

// Movimento da nave
function movePlayer() {
  if (player.movingLeft && player.x > 0) {
    player.x -= player.speed;
  }
  if (player.movingRight && player.x + player.width < canvasWidth) {
    player.x += player.speed;
  }
}

// Controle do teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    player.movingLeft = true;
  } else if (e.key === 'ArrowRight') {
    player.movingRight = true;
  } else if (e.key === ' ') {
    shoot();  // Dispara uma bala quando a barra de espaço é pressionada
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') {
    player.movingLeft = false;
  } else if (e.key === 'ArrowRight') {
    player.movingRight = false;
  }
});

// Propriedades dos invasores
const invaderRows = 5;
const invaderColumns = 10;
let invaders = [];
const invaderWidth = 30;
const invaderHeight = 20;
const invaderPadding = 10;
let invaderDirection = 1;

// Criação dos invasores
function createInvaders() {
  invaders = [];
  for (let row = 0; row < invaderRows; row++) {
    for (let col = 0; col < invaderColumns; col++) {
      invaders.push({
        x: col * (invaderWidth + invaderPadding) + 30,
        y: row * (invaderHeight + invaderPadding) + 30,
        width: invaderWidth,
        height: invaderHeight
      });
    }
  }
}

// Função para desenhar os invasores
function drawInvaders() {
  ctx.fillStyle = 'green';
  invaders.forEach(invader => {
    ctx.fillRect(invader.x, invader.y, invader.width, invader.height);
  });
}

// Movimento dos invasores
function moveInvaders() {
  invaders.forEach(invader => {
    invader.x += invaderDirection * 2;
  });

  // Verifica se os invasores atingiram as bordas
  const rightMostInvader = invaders.reduce((rightMost, invader) => Math.max(rightMost, invader.x + invader.width), 0);
  const leftMostInvader = invaders.reduce((leftMost, invader) => Math.min(leftMost, invader.x), canvasWidth);

  if (rightMostInvader >= canvasWidth || leftMostInvader <= 0) {
    invaderDirection *= -1;
    invaders.forEach(invader => invader.y += 10);  // Move os invasores para baixo ao trocar de direção
  }
}

// Lista de balas do jogador e dos invasores
let bullets = [];
const bulletSpeed = 7;

let invaderBullets = [];
const invaderBulletSpeed = 4;

// Função para disparar balas
function shoot() {
  bullets.push({
    x: player.x + player.width / 2 - 2,
    y: player.y,
    width: 4,
    height: 10
  });
}

// Função para disparar balas dos invasores aleatoriamente
function invaderShoot() {
  if (invaders.length > 0) {
    const randomInvader = invaders[Math.floor(Math.random() * invaders.length)];
    invaderBullets.push({
      x: randomInvader.x + randomInvader.width / 2,
      y: randomInvader.y + randomInvader.height,
      width: 4,
      height: 10
    });
  }
}

// Função para desenhar as balas
function drawBullets() {
  ctx.fillStyle = 'red';
  bullets.forEach(bullet => {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

// Função para desenhar as balas dos invasores
function drawInvaderBullets() {
  ctx.fillStyle = 'yellow';
  invaderBullets.forEach(bullet => {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

// Movimento das balas
function moveBullets() {
  bullets.forEach(bullet => {
    bullet.y -= bulletSpeed;  // Move a bala para cima
  });

  // Remove balas que saem da tela
  bullets = bullets.filter(bullet => bullet.y > 0);
}

// Movimento das balas dos invasores
function moveInvaderBullets() {
  invaderBullets.forEach(bullet => {
    bullet.y += invaderBulletSpeed;  // Move a bala para baixo
  });

  // Remove balas que saem da tela
  invaderBullets = invaderBullets.filter(bullet => bullet.y < canvasHeight);
}

// Função para verificar colisão entre uma bala e um invasor
function checkCollision(bullet, invader) {
  return bullet.x < invader.x + invader.width &&
         bullet.x + bullet.width > invader.x &&
         bullet.y < invader.y + invader.height &&
         bullet.y + bullet.height > invader.y;
}

// Remover invasores atingidos pelas balas
function handleBulletInvaderCollision() {
  bullets.forEach((bullet, bulletIndex) => {
    invaders.forEach((invader, invaderIndex) => {
      if (checkCollision(bullet, invader)) {
        // Remove o invasor e a bala atingida
        invaders.splice(invaderIndex, 1);
        bullets.splice(bulletIndex, 1);
        score += 10;  // Incrementa a pontuação
      }
    });
  });

  // Reinicia o jogo se todos os invasores forem destruídos
  if (invaders.length === 0) {
    resetGame();
  }
}

// Função para verificar colisão entre a nave do jogador e balas dos invasores
function handleInvaderBulletPlayerCollision() {
  invaderBullets.forEach((bullet, bulletIndex) => {
    if (bullet.x < player.x + player.width &&
        bullet.x + bullet.width > player.x &&
        bullet.y < player.y + player.height &&
        bullet.height + bullet.y > player.y) {
      invaderBullets.splice(bulletIndex, 1); // Remove a bala que atingiu o jogador
      player.life -= 1;  // Diminui a vida do jogador

      // Reinicia o jogo se a vida acabar
      if (player.life <= 0) {
        resetGame();
      }
    }
  });
}

// Função para reiniciar o jogo
function resetGame() {
  player.x = canvasWidth / 2 - player.width / 2;
  player.y = canvasHeight - 30;
  player.life = 3;
  score = 0;
  createInvaders();
  invaderBullets = [];
  bullets = [];
}

// Loop principal do jogo
function gameLoop() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);  // Limpa o canvas a cada frame

  movePlayer();
  moveInvaders();
  moveBullets();
  moveInvaderBullets();
  handleBulletInvaderCollision();  // Verifica colisões entre balas e invasores
  handleInvaderBulletPlayerCollision();  // Verifica colisões entre balas dos invasores e o jogador

  drawPlayer();
  drawLife();
  drawInvaders();
  drawBullets();
  drawInvaderBullets();

  // Exibe a pontuação
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, canvasWidth - 100, 20);

  requestAnimationFrame(gameLoop);  // Continua o loop do jogo
}

// Inicializa os invasores e começa o loop do jogo
createInvaders();
setInterval(invaderShoot, 1000);  // Faz os invasores atirarem a cada 1 segundo
gameLoop();

const canvas = document.getElementById('tetris');
    const context = canvas.getContext('2d');
    context.scale(30, 30); // Escala o grid para blocos de 30x30

    const pieces = 'ILJOTSZCM';
    const colors = {
        T: 'purple',
        O: 'yellow',
        L: 'orange',
        J: 'blue',
        I: 'cyan',
        S: 'green',
        Z: 'red',
        C: 'white',
        M: 'grey'
    };

    let score = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    document.getElementById('highScore').innerText = `Maior Pontuação: ${highScore}`;
    let dropCounter = 0;
    let dropInterval = 1000;
    let lastTime = 0;

    function createPiece(type) {
        switch (type) {
            case 'T': return [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
            case 'O': return [[1, 1], [1, 1]];
            case 'L': return [[0, 0, 1], [1, 1, 1], [0, 0, 0]];
            case 'J': return [[1, 0, 0], [1, 1, 1], [0, 0, 0]];
            case 'I': return [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
            case 'S': return [[0, 1, 1], [1, 1, 0], [0, 0, 0]];
            case 'Z': return [[1, 1, 0], [0, 1, 1], [0, 0, 0]];
            case 'C': return [[1, 1, 0], [1, 0, 0], [1, 1, 0]];
            case 'M': return [[0, 1, 0], [1, 1, 1], [0, 1, 0]];
        }
    }

    function drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = colors[player.type];
                    context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    function draw() {
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        drawMatrix(arena, { x: 0, y: 0 });
        drawMatrix(player.matrix, player.pos);
        document.getElementById('score').innerText = `Pontuação: ${score}`;
    }

    function merge(arena, player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + player.pos.y][x + player.pos.x] = player.type;
                }
            });
        });
    }

    function rotate(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
        }
        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    function playerDrop() {
        player.pos.y++;
        if (collide(arena, player)) {
            player.pos.y--;
            merge(arena, player);
            playerReset();
            arenaSweep();
        }
        dropCounter = 0;
    }

    function collide(arena, player) {
        const [m, o] = [player.matrix, player.pos];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    function playerReset() {
        const randomIndex = pieces.length * Math.random() | 0;
        player.matrix = createPiece(pieces[randomIndex]);
        player.pos.y = 0;
        player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
        player.type = pieces[randomIndex];
        if (collide(arena, player)) {
            arena.forEach(row => row.fill(0)); // Limpa o tabuleiro em caso de game over
            score = 0;
            document.getElementById('score').innerText = `Pontuação: ${score}`;
        }
    }

    function arenaSweep() {
        let rowCount = 0;
        outer: for (let y = arena.length - 1; y > 0; --y) {
            for (let x = 0; x < arena[y].length; ++x) {
                if (arena[y][x] === 0) {
                    continue outer;
                }
            }
            arena.splice(y, 1);
            arena.unshift(new Array(arena[0].length).fill(0));
            rowCount++;
        }
        if (rowCount > 0) {
            score += rowCount * 100;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                document.getElementById('highScore').innerText = `Maior Pontuação: ${highScore}`;
            }
        }
    }

    function update(time = 0) {
        const deltaTime = time - lastTime;
        lastTime = time;
        dropCounter += deltaTime;
        if (dropCounter > dropInterval) {
            playerDrop();
        }
        draw();
        requestAnimationFrame(update);
    }

    function createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }

    const arena = createMatrix(10, 20);

    const player = {
        pos: { x: 0, y: 0 },
        matrix: null,
        type: null
    };

    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') {
            player.pos.x--;
            if (collide(arena, player)) {
                player.pos.x++;
            }
        } else if (event.key === 'ArrowRight') {
            player.pos.x++;
            if (collide(arena, player)) {
                player.pos.x--;
            }
        } else if (event.key === 'ArrowDown') {
            playerDrop();
        } else if (event.key === 'ArrowUp') {
            rotate(player.matrix, 1);
            if (collide(arena, player)) {
                rotate(player.matrix, -1);
            }
        }
    });

    playerReset();
    update();
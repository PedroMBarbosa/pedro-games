window.addEventListener('keydown', function(e) {
            // Verifica se a tecla pressionada é uma das setas
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault(); // Impede a ação padrão (rolagem)
            }
        });
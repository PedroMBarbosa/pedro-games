let counter = 0;
    let firstSelection = "";
    let secondSelection = "";

    const cardsContainer = document.querySelector(".cards");
    const cards = Array.from(document.querySelectorAll(".cards .card"));
    const resetButton = document.getElementById("resetButton");

    // Função para embaralhar as cartas
    function shuffleCards() {
      cards.forEach((card) => {
        const randomPos = Math.floor(Math.random() * cards.length);
        cardsContainer.appendChild(cards[randomPos]);
      });
    }

    // Função para reiniciar o jogo
    function resetGame() {
      counter = 0;
      firstSelection = "";
      secondSelection = "";

      cards.forEach((card) => {
        card.classList.remove("clicked", "checked", "shake");
      });

      // Embaralha as cartas novamente
      shuffleCards();
    }

    // Chama a função de embaralhar ao carregar o jogo
    shuffleCards();

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        card.classList.add("clicked");

        if (counter === 0) {
          firstSelection = card.getAttribute("animal");
          counter++;
        } else {
          secondSelection = card.getAttribute("animal");
          counter = 0;

          if (firstSelection === secondSelection) {
            const correctCards = document.querySelectorAll(
              ".card[animal='" + firstSelection + "']"
            );

            correctCards[0].classList.add("checked");
            correctCards[0].classList.remove("clicked");
            correctCards[1].classList.add("checked");
            correctCards[1].classList.remove("clicked");
          } else {
            const incorrectCards = document.querySelectorAll(".card.clicked");

            incorrectCards[0].classList.add("shake");
            incorrectCards[1].classList.add("shake");

            setTimeout(() => {
              incorrectCards[0].classList.remove("shake");
              incorrectCards[0].classList.remove("clicked");
              incorrectCards[1].classList.remove("shake");
              incorrectCards[1].classList.remove("clicked");
            }, 800);
          }
        }
      });
    });

    // Evento para reiniciar o jogo ao clicar no botão
    resetButton.addEventListener("click", resetGame);
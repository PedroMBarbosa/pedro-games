const questions = [
    {
        question: "Por que pinguim não voa?",
        answers: [
            { text: "Porque ele quer", correct: false },
            { text: "Ele não sabe", correct: false },
            { text: "Por que você está perguntando isso?", correct: false },
            { text: "Quem disse que pinguim não voa?", correct: true },
        ],
    },
    {
        question: "O que é um 'taco'?",
        answers: [
            { text: "Um prato mexicano", correct: false },
            { text: "Uma fruta", correct: false },
            { text: "Um animal", correct: false },
            { text: "Um bastão", correct: true },
        ],
    },
    {
        question: "Qual o planeta mais quente do Sistema Solar?",
        answers: [
            { text: "Mercúrio", correct: false },
            { text: "Vênus", correct: true },
            { text: "Terra", correct: false },
            { text: "Saturno", correct: false },
        ],
    },
    {
        question: "Por que o Sol usa óculos de sol nos desenhos?",
        answers: [
            { text: "Se proteger dele mesmo", correct: false },
            { text: "Ver melhor", correct: false },
            { text: "Estilo", correct: true },
            { text: "Não Sei", correct: false },
        ],
    },
    {
        question: "Sim ou Não?",
        answers: [
            { text: "Sim", correct: false },
            { text: "Talvez", correct: false },
            { text: "Não", correct: false },
            { text: "E se não for?", correct: true },
        ],
    },
    {
        question: "O que o cego sonha?",
        answers: [
            { text: "Nada", correct: false },
            { text: "Ver", correct: true },
            { text: "Escuro", correct: false },
            { text: "Seus sonhos são formados por imagens perceptivas, não visuais, como imagens auditivas, táteis, olfativas e gustativas", correct: false },
        ],
    },
    {
        question: "Dá Like?",
        answers: [
            { text: "Sim", correct: false },
            { text: "Não", correct: true },
            { text: "Com certeza", correct: false },
            { text: "Provavelmente", correct: false },
        ],
    },
    {
        question: "Cavalo?",
        answers: [
            { text: "Cavalo", correct: false },
            { text: "Cavalo", correct: false },
            { text: "Cavalo", correct: false },
            { text: "Cavalo", correct: true },
        ],
    },
    {
        question: "Se você tentar falhar e tiver sucesso, você?",
        answers: [
            { text: "Teve sucesso", correct: false },
            { text: "Fracassou", correct: false },
            { text: "Nenhum nem outro", correct: false },
            { text: "Vish", correct: true },
        ],
    },
    {
        question: "Em que país foi a Copa do Mundo de 2002?",
        answers: [
            { text: "Japão", correct: true },
            { text: "Coreia do Sul", correct: true },
            { text: "Brasil", correct: false },
            { text: "Todas", correct: false },
        ],
    },
    {
        question: "Quantos dedos tem uma lagartixa?",
        answers: [
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "Lagartixa não tem dedo", correct: false },
        ],
    },
    {
        question: "Se um pato perde a pata, ele fica?",
        answers: [
            { text: "Manco", correct: false },
            { text: "Viuvo", correct: false },
            { text: "Bobo", correct: true },
            { text: "Nada, ele é um pato", correct: false },
        ],
    },
    {
        question: "Qual a fórmula química da água?",
        answers: [
            { text: "O2O", correct: false },
            { text: "H1O", correct: false },
            { text: "H2O", correct: true },
            { text: "O2H", correct: false },
        ],
    },
    {
        question: "Quem inventou o computador?",
        answers: [
            { text: "Alan Turing", correct: true },
            { text: "Albert Einstein", correct: false },
            { text: "Isaac Newton", correct: false },
            { text: "Nikola Tesla", correct: false },
        ],
    },
    {
        question: "Qual foi a resposta anterior?",
        answers: [
            { text: "A segunda", correct: false },
            { text: "A terceira", correct: false },
            { text: "A última", correct: false },
            { text: "A primeira", correct: true },
        ],
    },
    {
        question: "?. Adivinhe o número da próxima pergunta",
        answers: [
            { text: "15", correct: false },
            { text: "16", correct: false },
            { text: "17", correct: true },
            { text: "18", correct: false },
        ],
        isGuessQuestion: true // Flag para identificar essa questão especial
    },
    {
        question: "Quanto é 2x3+5/2?",
        answers: [
            { text: "5,7", correct: false },
            { text: "5,6", correct: false },
            { text: "5,4", correct: false },
            { text: "5,5", correct: true },
        ],
    },
    {
        question: "Qual o dia do Rock?",
        answers: [
            { text: "13/07", correct: true },
            { text: "14/07", correct: false },
            { text: "11/09", correct: false },
            { text: "13/13", correct: false },
        ],
    },
    {
        question: "Quanto é 2+2?",
        answers: [
            { text: "4", correct: false },
            { text: "fish", correct: true },
            { text: "cat", correct: false },
            { text: "head", correct: false },
        ],
    },
    {
        question: "Como usar shampoo?",
        answers: [
            { text: "Passar na mão depois na cabeça", correct: false },
            { text: "Jogar direto na cabeça", correct: false },
            { text: "Jogar no chão", correct: false },
            { text: "Usar detergente", correct: true },
        ],
    },
];

let currentQuestionIndex = 0;

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const endQuizContainer = document.getElementById('end-quiz-container');
const gameOverContainer = document.getElementById('game-over-container');
const restartGameButton = document.getElementById('restart-game-button');

function startGame() {
    currentQuestionIndex = 0;
    endQuizContainer.classList.add('hidden');
    gameOverContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    nextQuestion();
}

function nextQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    
    // Oculta o número da questão apenas se for a pergunta especial
    if (currentQuestion.isGuessQuestion) {
        document.getElementById('question').innerText = currentQuestion.question;
    } else {
        document.getElementById('question').innerText = 
            (currentQuestionIndex + 1) + ". " + currentQuestion.question;
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer) {
    if (answer.correct) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            nextQuestion();
        } else {
            showEndQuiz();
        }
    } else {
        showGameOver();
    }
}

function showEndQuiz() {
    questionContainer.classList.add('hidden');
    endQuizContainer.classList.remove('hidden');
}

function showGameOver() {
    questionContainer.classList.add('hidden');
    gameOverContainer.classList.remove('hidden');
}

restartGameButton.addEventListener('click', startGame);

startGame();

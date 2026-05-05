
function startGame() {
    window.location.href = "quiz.html";
    backgroundSound.pause();
}

function goHome() {
    window.location.href = "index.html";
    backgroundSound.pause();
}


const backgroundSound = new Audio("img/7.mp3");
const correctAnswerSound = new Audio("img/c.mp3");


const quizQuestions = [
    {
        question: "Which of the following scoping type does JavaScript use?",
        options: ["Segmental", "Lexical", "Literal", "Sequential"],
        correctAnswer: "Lexical"
    },
    {
        question: "Which of the following is not javascript data types?",
        options: ["Null type", "Undefined type", "Number type", "All of the mentioned"],
        correctAnswer: "All of the mentioned"
    },
    {
        question: "What is JavaScript?",
        options: [
            "JavaScript is a scripting language used to make the website interactive",
            "JavaScript is an assembly language",
            "JavaScript is a compiled language",
            "None"
        ],
        correctAnswer: "JavaScript is a scripting language used to make the website interactive"
    },
    {
        question: "Which of the following is correct about JavaScript?",
        options: [
            "Object-Based language",
            "Assembly-language",
            "Object-Oriented language",
            "High-level language"
        ],
        correctAnswer: "Object-Based language"
    },
    {
        question: "Who developed Python Programming Language?",
        options: [
            "Wick van Rossum",
            "Rasmus Lerdorf",
            "Guido van Rossum",
            "Niene Stom"
        ],
        correctAnswer: "Guido van Rossum"
    }
];

let currentQuestionIndex = 0;
let userScore = 0;
let questionTimer;
let remainingTime = 15;


quizQuestions.sort(() => Math.random() - 0.5);

function loadQuestion() {

    if (currentQuestionIndex >= 3) {

        if (userScore === currentQuestionIndex) {
            backgroundSound.loop = true;
            backgroundSound.play();
        }

        document.body.innerHTML = `
        <h1 class="text-center mt-20 text-3xl">
        ${userScore < 3 ? "Better Luck Next Time" : "You Are Winner"} 
        ${userScore} / ${currentQuestionIndex}
        </h1>

        ${userScore >= 3 ? `<img src="img/cele.gif" class="mx-auto w-60 mb-6">` : ""}

        <button onclick="startGame()" 
        class="absolute bottom-60 left-1/4 px-8 py-3 bg-yellow-400 rounded-lg">
        Restart Game
        </button>

        <button onclick="goHome()" 
        class="absolute bottom-60 left-3/4 px-8 py-3 bg-yellow-400 rounded-lg">
        Home
        </button>`;
        return;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];

    document.getElementById("question").innerText = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");

        button.innerText = option;
        button.className = "w-full p-3 bg-purple-700 rounded hover:bg-purple-600";

        button.onclick = () => checkAnswer(option);

        optionsContainer.appendChild(button);
    });

    startTimer();
}

function checkAnswer(selectedOption) {
    clearInterval(questionTimer);

    if (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer) {
        userScore++;

        correctAnswerSound.pause();
        correctAnswerSound.currentTime = 0;

        setTimeout(() => {
            correctAnswerSound.play();
            setTimeout(() => {
                correctAnswerSound.pause();
                correctAnswerSound.currentTime = 0;
            }, 2000);
        }, 200);
    }

    currentQuestionIndex++;
    loadQuestion();
}


function startTimer() {
    remainingTime = 15;
    document.getElementById("timer").innerText = remainingTime;

    questionTimer = setInterval(() => {
        remainingTime--;
        document.getElementById("timer").innerText = remainingTime;

        if (remainingTime === 0) {
            clearInterval(questionTimer);
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1000);
}


loadQuestion();
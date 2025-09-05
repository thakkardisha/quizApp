const quizData = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the boiling point of water?",
        options: ["80°C", "100°C", "150°C", "120°C"],
        answer: "100°C"
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Python", "C++", "JavaScript", "Java"],
        answer: "JavaScript"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');
const endContainer = document.getElementById('end-container');
const finalMessage = document.getElementById('final-message');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
const questionContainer = document.getElementById('question-container');

function loadQuestion() {
    feedbackEl.textContent = '';
    feedbackEl.className = '';
    nextBtn.classList.add('hidden');
    const quiz = quizData[currentQuestion];
    questionEl.textContent = quiz.question;
    optionsEl.innerHTML = '';
    quiz.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectOption(btn, option);
        optionsEl.appendChild(btn);
    });
}

function selectOption(btn, selected) {
    // Disable all options after one is clicked
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(b => b.disabled = true);
    btn.classList.add('selected');
    if (selected === quizData[currentQuestion].answer) {
        score++;
        feedbackEl.textContent = "Correct!";
        feedbackEl.className = "correct";
    } else {
        feedbackEl.textContent = `Incorrect. Correct Answer: ${quizData[currentQuestion].answer}`;
        feedbackEl.className = "incorrect";
    }
    scoreEl.textContent = score;
    nextBtn.classList.remove('hidden');
}

nextBtn.onclick = function() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
};

function showFinalResult() {
    questionContainer.classList.add('hidden');
    endContainer.classList.remove('hidden');
    finalScore.textContent = `Your total score: ${score} / ${quizData.length}`;
    let message;
    if (score === quizData.length) {
        message = "Outstanding! You got all questions right!";
    } else if (score >= quizData.length - 2) {
        message = "Well done! Almost perfect.";
    } else if (score >= Math.floor(quizData.length / 2)) {
        message = "Good try! Review and play again.";
    } else {
        message = "Practice makes perfect! Try again.";
    }
    finalMessage.textContent = message;
}

restartBtn.onclick = function() {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = score;
    endContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    loadQuestion();
};

// Initialize quiz
loadQuestion();

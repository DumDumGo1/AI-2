
// ✨ STERNENHIMMEL
const starfield = document.getElementById("starfield");

for (let i = 0; i < 90; i++) {
    const star = document.createElement("span");
    star.textContent = Math.random() > 0.5 ? "✦" : "·";
    star.style.position = "absolute";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.color = Math.random() > 0.5 ? "#c8a5ff" : "#ffffff";
    star.style.opacity = Math.random() * 0.7 + 0.2;
    star.style.fontSize = Math.random() * 12 + 5 + "px";
    star.style.animation = `twinkle ${Math.random() * 4 + 2}s infinite alternate`;
    starfield.appendChild(star);
}


// 🪐 PLANETEN-KARTEN
const planetCards = document.querySelectorAll(".planet-card");
const popup = document.getElementById("planet-popup");
const planetFact = document.getElementById("planet-fact");

planetCards.forEach(card => {
    card.addEventListener("click", () => {
        planetFact.textContent = card.dataset.fact;
        popup.classList.add("visible");
    });
});

document.getElementById("close-planet").addEventListener("click", () => {
    popup.classList.remove("visible");
});


// 🌠 ZUFÄLLIGE WELTRAUM-FAKTEN
const facts = [
    "Ein Tag auf der Venus dauert länger als ein Venusjahr!",
    "Das Licht der Sonne braucht ungefähr 8 Minuten und 20 Sekunden bis zur Erde.",
    "Jupiter hat ein riesiges Sturmsystem, den Grossen Roten Fleck.",
    "Auf dem Mars befindet sich der grösste bekannte Vulkan des Sonnensystems.",
    "Saturns Ringe bestehen aus unzähligen Eis- und Gesteinsstücken.",
    "Der Mond entfernt sich jedes Jahr ein kleines Stück von der Erde.",
    "Im Weltall gibt es riesige Wolken aus Gas und Staub, aus denen Sterne entstehen.",
    "Neutronensterne können unglaublich dicht sein."
];

document.getElementById("new-fact").addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    document.getElementById("random-fact").textContent = facts[randomIndex];
});


// 🧠 GALAXY QUIZ
const questions = [
    {
        question: "Welcher Planet ist der grösste?",
        answers: ["Mars", "Jupiter", "Merkur", "Venus"],
        correct: 1
    },
    {
        question: "Wie heisst unsere Galaxie?",
        answers: ["Andromeda", "Orion", "Milchstrasse", "Sonnensystem"],
        correct: 2
    },
    {
        question: "Welcher Planet ist für seine Ringe bekannt?",
        answers: ["Saturn", "Erde", "Mars", "Merkur"],
        correct: 0
    },
    {
        question: "Was kann aus einem Schwarzen Loch entkommen?",
        answers: ["Licht", "Nichts aus dem Inneren", "Wasser", "Sauerstoff"],
        correct: 1
    },
    {
        question: "Wie viele Planeten hat unser Sonnensystem?",
        answers: ["7", "9", "8", "10"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedback = document.getElementById("quiz-feedback");
const nextButton = document.getElementById("next-question");
const progress = document.getElementById("quiz-progress");

function showQuestion() {
    answered = false;
    const q = questions[currentQuestion];

    questionElement.textContent = q.question;
    progress.textContent = `FRAGE ${currentQuestion + 1} / ${questions.length}`;
    feedback.textContent = "";
    nextButton.hidden = true;
    answersElement.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", () => checkAnswer(index, button));

        answersElement.appendChild(button);
    });
}

function checkAnswer(index, selectedButton) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const allButtons = answersElement.querySelectorAll("button");

    allButtons.forEach(button => button.disabled = true);

    if (index === q.correct) {
        score++;
        selectedButton.classList.add("correct");
        feedback.textContent = "✦ Richtig! Sehr gut!";
    } else {
        selectedButton.classList.add("wrong");
        allButtons[q.correct].classList.add("correct");
        feedback.textContent = "Fast! Die grüne Antwort ist richtig.";
    }

    nextButton.hidden = false;
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionElement.textContent = "MISSION ABGESCHLOSSEN! 🚀";
        answersElement.innerHTML = "";
        progress.textContent = "QUIZ BEENDET";
        feedback.textContent = `Du hast ${score} von ${questions.length} Fragen richtig beantwortet!`;
        nextButton.textContent = "NOCHMAL SPIELEN ↻";
        nextButton.hidden = false;
        nextButton.onclick = restartQuiz;
    }
});

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    nextButton.textContent = "WEITER →";
    nextButton.onclick = null;
    showQuestion();
}

showQuestion();


// 🔐 GEHEIMES EASTER EGG
let secretClicks = 0;

document.getElementById("secret-button").addEventListener("click", () => {
    secretClicks++;

    const message = document.getElementById("secret-message");

    if (secretClicks === 1) {
        message.textContent = "Hm ... da scheint etwas verborgen zu sein. ✧";
    } else if (secretClicks === 2) {
        message.textContent = "Du bist auf der richtigen Spur ... 🌙";
    } else if (secretClicks >= 3) {
        message.textContent = "🌌 GEHEIMNIS ENTDECKT: Du bist jetzt offiziell ein GALAXY EXPLORER!";
        document.body.classList.add("galaxy-mode");
    }
});


// ✨ KLEINES KONAMI-GEHEIMNIS
let secretKeys = "";

document.addEventListener("keydown", event => {
    secretKeys += event.key.toLowerCase();
    secretKeys = secretKeys.slice(-6);

    if (secretKeys === "galaxy") {
        alert("🌌 GEHEIMCODE AKTIVIERT! Willkommen im geheimen Weltraum-Club!");
    }
});

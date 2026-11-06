
// Karten öffnen
function reveal(button) {
    const info = button.nextElementSibling;

    if (info.style.display === "block") {
        info.style.display = "none";
        button.textContent = "Mehr erfahren +";
    } else {
        info.style.display = "block";
        button.textContent = "Weniger anzeigen −";
    }
}

// Zufällige Fakten
const facts = [
    ["🐙", "Ein Oktopus hat drei Herzen."],
    ["🌌", "Im Weltall gibt es riesige Wolken aus Gas und Staub."],
    ["🦈", "Haie gibt es schon länger als Bäume."],
    ["🍯", "Honig kann bei richtiger Lagerung sehr lange haltbar bleiben."],
    ["🪐", "Ein Tag auf der Venus dauert länger als ihr Jahr."],
    ["🦋", "Schmetterlinge schmecken mit ihren Füssen."],
    ["⚡", "Blitze können heisser sein als die Oberfläche der Sonne."]
];

function newFact() {
    const random = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById("factEmoji").textContent = random[0];
    document.getElementById("factText").textContent = random[1];
}

// Quiz
const questions = [
    {
        q: "Welches Tier hat drei Herzen?",
        a: ["Hai", "Oktopus", "Delfin"],
        correct: 1
    },
    {
        q: "Welcher Planet ist der Sonne am nächsten?",
        a: ["Merkur", "Mars", "Jupiter"],
        correct: 0
    },
    {
        q: "Wie viele Beine hat eine Spinne?",
        a: ["6", "8", "10"],
        correct: 1
    },
    {
        q: "Was ist das grösste Organ des Menschen?",
        a: ["Herz", "Gehirn", "Haut"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.q;
    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.a.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        answers.appendChild(button);
    });
}

function checkAnswer(index) {
    if (index === questions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        document.getElementById("question").textContent = "Challenge beendet! 🏆";
        document.getElementById("answers").innerHTML =
            "<button onclick='startQuiz()'>NOCHMAL SPIELEN ↻</button>";
        document.getElementById("result").textContent =
            "Du hast " + score + " von " + questions.length + " Punkten erreicht!";
    }
}

// Geheimes Easter Egg
const popup = document.getElementById("popup");

document.getElementById("secretBtn").addEventListener("click", () => {
    popup.style.display = "flex";
});

document.getElementById("closePopup").addEventListener("click", () => {
    popup.style.display = "none";
});

// Auch mit ESC schliessen
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        popup.style.display = "none";
    }
});

// Geheime Tastenkombination
let secretCode = "";

document.addEventListener("keydown", event => {
    secretCode += event.key.toLowerCase();
    secretCode = secretCode.slice(-5);

    if (secretCode === "magic") {
        document.body.style.background = "#21103a";
        document.querySelector(".hero h1 span").textContent = "MAGIC!";
        popup.style.display = "flex";
    }
});

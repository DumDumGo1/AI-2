
const dinos = [
    {
        emoji: "🦖",
        name: "Tyrannosaurus Rex",
        info: "Der T. rex lebte vor ungefähr 68 bis 66 Millionen Jahren. Er hatte einen riesigen Schädel, kräftige Hinterbeine und zwei sehr kurze Arme. Er war einer der bekanntesten grossen Landräuber."
    },
    {
        emoji: "🦕",
        name: "Brachiosaurus",
        info: "Der Brachiosaurus lebte vor ungefähr 154 bis 150 Millionen Jahren. Seine langen Vorderbeine und sein langer Hals halfen ihm, Pflanzen in höheren Baumregionen zu erreichen."
    },
    {
        emoji: "🦏",
        name: "Triceratops",
        info: "Der Triceratops lebte vor ungefähr 68 bis 66 Millionen Jahren. Er hatte drei Hörner und einen grossen knöchernen Nackenschild. Er ernährte sich von Pflanzen."
    },
    {
        emoji: "🐊",
        name: "Spinosaurus",
        info: "Der Spinosaurus lebte vor ungefähr 100 Millionen Jahren. Sein auffälliges Rückensegel machte ihn besonders. Seine Lebensweise war eng mit Gewässern verbunden."
    }
];

// Dinosaurier-Pop-ups
function showDino(index) {
    const dino = dinos[index];

    document.getElementById("popupEmoji").textContent = dino.emoji;
    document.getElementById("popupTitle").innerHTML =
        "<h2>" + dino.name + "</h2>";
    document.getElementById("popupText").textContent = dino.info;

    document.getElementById("dinoPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("dinoPopup").style.display = "none";
}

// Zufällige Fakten
const facts = [
    ["🦈", "Haie existierten schon lange vor den ersten Dinosauriern."],
    ["🪶", "Viele Dinosaurier besassen Federn. Vögel stammen von theropoden Dinosauriern ab."],
    ["🥚", "Dinosaurier legten Eier. Forschende haben viele versteinerte Dinosauriereier gefunden."],
    ["🌍", "Die Kontinente lagen zur Zeit der Dinosaurier teilweise ganz anders als heute."],
    ["🦕", "Einige Sauropoden konnten über 30 Meter lang werden."],
    ["🦖", "Der T. rex hatte einen aussergewöhnlich kräftigen Biss."],
    ["☄️", "Vor etwa 66 Millionen Jahren führte ein grosser Asteroideneinschlag zum Aussterben der Nicht-Vogel-Dinosaurier."]
];

function randomFact() {
    const fact = facts[Math.floor(Math.random() * facts.length)];

    document.getElementById("factEmoji").textContent = fact[0];
    document.getElementById("factText").textContent = fact[1];
}

// Quiz
const questions = [
    {
        q: "In welchem Erdzeitalter lebte der T. rex?",
        answers: ["Trias", "Kreidezeit", "Jura"],
        correct: 1
    },
    {
        q: "Was frass der Triceratops?",
        answers: ["Pflanzen", "Fische", "Andere Dinosaurier"],
        correct: 0
    },
    {
        q: "Wovon stammen die heutigen Vögel ab?",
        answers: ["Säugetieren", "Theropoden-Dinosauriern", "Fischen"],
        correct: 1
    },
    {
        q: "Wie viele Hörner hatte ein Triceratops?",
        answers: ["Zwei", "Vier", "Drei"],
        correct: 2
    },
    {
        q: "Wann starben die Nicht-Vogel-Dinosaurier aus?",
        answers: ["Vor 66 Millionen Jahren", "Vor 5 Millionen Jahren", "Vor 200 Millionen Jahren"],
        correct: 0
    }
];

let current = 0;
let points = 0;
let answered = false;

function startQuiz() {
    current = 0;
    points = 0;
    answered = false;
    document.getElementById("quizResult").textContent = "";
    showQuestion();
}

function showQuestion() {
    answered = false;

    const q = questions[current];

    document.getElementById("progress").textContent =
        "QUESTION " + (current + 1) + " / " + questions.length;

    document.getElementById("question").textContent = q.q;

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = "➜  " + answer;
        button.onclick = () => checkAnswer(index, button);
        answers.appendChild(button);
    });
}

function checkAnswer(index, button) {
    if (answered) return;
    answered = true;

    const q = questions[current];

    if (index === q.correct) {
        points++;
        button.textContent = "✓  " + q.answers[index] + " — RICHTIG!";
        button.style.background = "#b9e477";
        button.style.color = "#142014";
    } else {
        button.textContent = "✕  " + q.answers[index];
        button.style.background = "#8c3939";
    }

    document.querySelectorAll("#answers button").forEach((b, i) => {
        b.disabled = true;

        if (i === q.correct) {
            b.style.borderColor = "#b9e477";
        }
    });

    const result = document.getElementById("quizResult");

    result.textContent =
        index === q.correct ? "SUPER! 🦖" : "Die richtige Antwort ist: " + q.answers[q.correct];

    const next = document.createElement("button");
    next.textContent = current === questions.length - 1
        ? "ERGEBNIS ANZEIGEN 🏆"
        : "NÄCHSTE FRAGE →";

    next.onclick = nextQuestion;
    next.style.marginTop = "20px";
    next.style.padding = "14px 20px";
    next.style.background = "#b9e477";
    next.style.color = "#142014";
    next.style.border = "none";
    next.style.borderRadius = "5px";
    next.style.fontWeight = "bold";
    next.style.cursor = "pointer";

    document.getElementById("answers").appendChild(next);
}

function nextQuestion() {
    current++;

    if (current < questions.length) {
        showQuestion();
        document.getElementById("quizResult").textContent = "";
    } else {
        document.getElementById("progress").textContent = "MISSION COMPLETED";
        document.getElementById("question").textContent = "🏆 DEIN ERGEBNIS";

        document.getElementById("answers").innerHTML =
            "<button onclick='startQuiz()'>NOCHMAL SPIELEN ↻</button>";

        let message = "Weiterforschen, Dino-Experte!";

        if (points === 5) message = "LEGENDARY! Du bist ein Dino-Master! 🦖";
        else if (points >= 3) message = "Fantastisch! Du kennst dich gut aus! 🌿";

        document.getElementById("quizResult").textContent =
            points + " / 5 Punkte — " + message;
    }
}

// Geheimnis
function closeSecret() {
    document.getElementById("secretPopup").style.display = "none";
}

document.getElementById("secretButton").addEventListener("click", () => {
    document.getElementById("secretPopup").style.display = "flex";
});

// Tastenkombination: DINO
let secret = "";

document.addEventListener("keydown", event => {
    secret += event.key.toLowerCase();
    secret = secret.slice(-4);

    if (secret === "dino") {
        document.getElementById("secretPopup").style.display = "flex";
        secret = "";
    }

    if (event.key === "Escape") {
        closeSecret();
        closePopup();
    }
});

// Klick ausserhalb eines Pop-ups schliesst es
document.querySelectorAll(".popup").forEach(popup => {
    popup.addEventListener("click", event => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});

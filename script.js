const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".page-section");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");

// NAVEGACION

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.toggle("active", section.id === sectionId);
    });

    navButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.section === sectionId
        );
    });

    sidebar.classList.remove("open");

    if (sectionId === "preguntas") renderQuestion();
}

navButtons.forEach(button => {
    button.addEventListener("click", () => {
        showSection(button.dataset.section);
    });
});

document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
        showSection(button.dataset.go);
    });
});

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// PREGUNTAS RAPIDAS

const questions = [
    {
        question: "¿Playa o montaña?",
        options: ["🏖️ Playa", "🏔️ Montaña"]
    },
    {
        question: "¿Día o noche?",
        options: ["☀️ Día", "🌙 Noche"]
    },
    {
        question: "¿Películas o videojuegos?",
        options: ["🎬 Películas", "🎮 Videojuegos"]
    },
    {
        question: "¿Pasado o futuro?",
        options: ["⌛ Pasado", "🚀 Futuro"]
    },
    {
        question: "¿Risas o aventuras?",
        options: ["😂 Risas", "🌎 Aventuras"]
    }
];

let currentQuestion = 0;

function renderQuestion() {
    const container = document.getElementById("question-container");
    if (!container) return;

    if (currentQuestion >= questions.length) {
        container.innerHTML = `
            <h2>¡Terminaste! 🎉</h2>
            <p>Has completado todas las preguntas.</p>
            <button id="restart-questions" class="main-btn">
                VOLVER A JUGAR
            </button>
        `;

        document.getElementById("restart-questions")
            .addEventListener("click", () => {
                currentQuestion = 0;
                renderQuestion();
            });

        return;
    }

    const item = questions[currentQuestion];

    container.innerHTML = `
        <p class="question-counter">
            PREGUNTA ${currentQuestion + 1} DE ${questions.length}
        </p>
        <h2>${item.question}</h2>
        <div class="answer-options">
            ${item.options.map((option, index) => `
                <button class="answer-btn" data-answer="${index}">
                    ${option}
                </button>
            `).join("")}
        </div>
        <p id="answer-feedback"></p>
    `;

    container.querySelectorAll(".answer-btn").forEach(button => {
        button.addEventListener("click", () => {
            container.querySelectorAll(".answer-btn").forEach(btn => {
                btn.disabled = true;
            });

            document.getElementById("answer-feedback")
                .textContent = "¡Respuesta registrada! 😎";

            const nextButton = document.createElement("button");
            nextButton.textContent = "SIGUIENTE";
            nextButton.className = "main-btn";

            container.appendChild(nextButton);

            nextButton.addEventListener("click", () => {
                currentQuestion++;
                renderQuestion();
            });
        });
    });
}

// MINIJUEGO: NUMERO SECRETO

const gameContainer = document.createElement("div");
gameContainer.id = "secret-game";

gameContainer.innerHTML = `
    <p class="game-instruction">
        Encuentra el número secreto.
    </p>

    <div class="game-options">
        <button class="game-number" data-number="1">01</button>
        <button class="game-number" data-number="2">02</button>
        <button class="game-number" data-number="3">03</button>
    </div>

    <p id="game-result">ELIGE UN NÚMERO</p>

    <button id="game-restart" class="main-btn">
        VOLVER A INTENTAR
    </button>
`;

document.getElementById("minijuegos").appendChild(gameContainer);

let secretNumber = Math.floor(Math.random() * 3) + 1;
let gameFinished = false;

function startSecretGame() {
    secretNumber = Math.floor(Math.random() * 3) + 1;
    gameFinished = false;

    document.getElementById("game-result").textContent =
        "ELIGE UN NÚMERO";

    document.querySelectorAll(".game-number").forEach(button => {
        button.disabled = false;
        button.classList.remove("correct", "incorrect");
    });
}

document.querySelectorAll(".game-number").forEach(button => {
    button.addEventListener("click", () => {
        if (gameFinished) return;

        gameFinished = true;

        const chosenNumber = Number(button.dataset.number);
        const result = document.getElementById("game-result");

        if (chosenNumber === secretNumber) {
            result.textContent = "¡ACERTASTE! 🎉";
            button.classList.add("correct");
        } else {
            result.textContent = "CASI... EL NÚMERO ERA " + secretNumber;
            button.classList.add("incorrect");
        }

        document.querySelectorAll(".game-number").forEach(btn => {
            btn.disabled = true;
        });
    });
});

document.getElementById("game-restart").addEventListener(
    "click",
    startSecretGame
);
/* ==================================================
   ONLINE EXAMINATION SYSTEM
   ExamPro
================================================== */


/* ================= QUESTIONS ================= */

const exams = {

    html: {
        title: "HTML & CSS Basics",
        duration: 5,

        questions: [

            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Text Machine Language",
                    "Hyperlinks Text Mark Language",
                    "Home Tool Markup Language"
                ],
                answer: 0
            },

            {
                question: "Which HTML tag is used to create a paragraph?",
                options: [
                    "<paragraph>",
                    "<p>",
                    "<para>",
                    "<text>"
                ],
                answer: 1
            },

            {
                question: "Which CSS property is used to change text color?",
                options: [
                    "font-color",
                    "text-color",
                    "color",
                    "text-style"
                ],
                answer: 2
            },

            {
                question: "Which tag is used to create a hyperlink?",
                options: [
                    "<link>",
                    "<a>",
                    "<href>",
                    "<url>"
                ],
                answer: 1
            },

            {
                question: "Which CSS property is used to change the background color?",
                options: [
                    "background-color",
                    "bgcolor",
                    "background-style",
                    "color-background"
                ],
                answer: 0
            }

        ]
    },


    javascript: {

        title: "JavaScript Basics",
        duration: 5,

        questions: [

            {
                question: "Which keyword is used to declare a variable in JavaScript?",
                options: [
                    "variable",
                    "var",
                    "int",
                    "string"
                ],
                answer: 1
            },

            {
                question: "Which symbol is used for single-line comments?",
                options: [
                    "/* */",
                    "<!-- -->",
                    "//",
                    "#"
                ],
                answer: 2
            },

            {
                question: "Which method is used to print something in the browser console?",
                options: [
                    "console.log()",
                    "print()",
                    "write.console()",
                    "display()"
                ],
                answer: 0
            },

            {
                question: "Which data type stores true or false?",
                options: [
                    "String",
                    "Number",
                    "Boolean",
                    "Object"
                ],
                answer: 2
            },

            {
                question: "Which symbol is used for strict equality?",
                options: [
                    "=",
                    "==",
                    "===",
                    "!="
                ],
                answer: 2
            }

        ]
    },


    computer: {

        title: "Computer Fundamentals",
        duration: 5,

        questions: [

            {
                question: "What is the brain of a computer?",
                options: [
                    "RAM",
                    "CPU",
                    "Hard Disk",
                    "Monitor"
                ],
                answer: 1
            },

            {
                question: "Which of these is an input device?",
                options: [
                    "Monitor",
                    "Printer",
                    "Keyboard",
                    "Speaker"
                ],
                answer: 2
            },

            {
                question: "What does RAM stand for?",
                options: [
                    "Random Access Memory",
                    "Read Access Memory",
                    "Rapid Access Machine",
                    "Random Application Memory"
                ],
                answer: 0
            },

            {
                question: "Which is an operating system?",
                options: [
                    "Google",
                    "Windows",
                    "Intel",
                    "HTML"
                ],
                answer: 1
            },

            {
                question: "Which device is commonly used for permanent data storage?",
                options: [
                    "RAM",
                    "Cache",
                    "Hard Disk",
                    "Register"
                ],
                answer: 2
            }

        ]
    }

};


/* ================= VARIABLES ================= */

let currentExam = null;
let currentQuestion = 0;
let selectedAnswers = [];
let timeLeft = 0;
let timerInterval = null;


/* ================= DOM ELEMENTS ================= */

const quizSection = document.getElementById("quizSection");
const resultSection = document.getElementById("resultSection");
const examSection = document.getElementById("exams");

const quizTitle = document.getElementById("quizTitle");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");

const questionNumber = document.getElementById("questionNumber");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");

const timer = document.getElementById("timer");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");


/* ================= START EXAM ================= */

function startExam(examName) {

    if (!exams[examName]) {
        alert("Exam not found.");
        return;
    }

    currentExam = exams[examName];

    currentQuestion = 0;

    selectedAnswers = new Array(
        currentExam.questions.length
    ).fill(null);

    timeLeft = currentExam.duration * 60;

    examSection.classList.add("hidden");

    document.getElementById("home").classList.add("hidden");

    document.querySelector(".features").classList.add("hidden");

    document.getElementById("about").classList.add("hidden");

    document.getElementById("contact").classList.add("hidden");

    quizSection.classList.remove("hidden");

    resultSection.classList.add("hidden");

    quizTitle.textContent = currentExam.title;

    startTimer();

    displayQuestion();

    quizSection.scrollIntoView({
        behavior: "smooth"
    });
}


/* ================= DISPLAY QUESTION ================= */

function displayQuestion() {

    const question = currentExam.questions[currentQuestion];

    questionText.textContent = question.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${currentExam.questions.length}`;

    const percentage =
        Math.round(
            ((currentQuestion + 1) /
            currentExam.questions.length) * 100
        );

    progressPercent.textContent = `${percentage}%`;

    progressFill.style.width = `${percentage}%`;

    optionsContainer.innerHTML = "";


    question.options.forEach((option, index) => {

        const optionDiv = document.createElement("label");

        optionDiv.className = "option";


        if (selectedAnswers[currentQuestion] === index) {
            optionDiv.classList.add("selected");
        }


       const radio = document.createElement("input");

radio.type = "radio";
radio.name = "answer";
radio.value = index;

if (selectedAnswers[currentQuestion] === index) {
    radio.checked = true;
}

const span = document.createElement("span");

span.textContent = option;

optionDiv.appendChild(radio);
optionDiv.appendChild(span);

        optionDiv.addEventListener("click", function () {

            selectedAnswers[currentQuestion] = index;

            updateSelectedOption();

        });


        optionsContainer.appendChild(optionDiv);

    });


    updateNavigationButtons();
}


/* ================= UPDATE OPTION ================= */

function updateSelectedOption() {

    const options =
        document.querySelectorAll(".option");

    options.forEach((option, index) => {

        if (index === selectedAnswers[currentQuestion]) {
            option.classList.add("selected");
        } else {
            option.classList.remove("selected");
        }

    });

}


/* ================= NAVIGATION ================= */

function nextQuestion() {

    if (
        selectedAnswers[currentQuestion] === null
    ) {

        alert("Please select an answer before continuing.");

        return;
    }


    if (
        currentQuestion <
        currentExam.questions.length - 1
    ) {

        currentQuestion++;

        displayQuestion();

    } else {

        const confirmSubmit =
            confirm(
                "You have reached the last question. Submit the exam?"
            );

        if (confirmSubmit) {
            submitExam();
        }

    }

}


/* ================= PREVIOUS ================= */

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        displayQuestion();

    }

}


/* ================= BUTTON STATUS ================= */

function updateNavigationButtons() {

    if (currentQuestion === 0) {

        prevBtn.style.visibility = "hidden";

    } else {

        prevBtn.style.visibility = "visible";

    }


    if (
        currentQuestion ===
        currentExam.questions.length - 1
    ) {

        nextBtn.textContent = "Finish →";

    } else {

        nextBtn.textContent = "Next →";

    }

}


/* ================= TIMER ================= */

function startTimer() {

    clearInterval(timerInterval);

    updateTimer();


    timerInterval = setInterval(() => {

        timeLeft--;

        updateTimer();


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            alert(
                "Time is over! Your exam will be submitted automatically."
            );

            submitExam();

        }

    }, 1000);

}


/* ================= UPDATE TIMER ================= */

function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;


    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    if (timeLeft <= 30) {

        timer.style.color = "#dc2626";

    }

}


/* ================= SUBMIT EXAM ================= */

function submitExam() {

    if (!currentExam) {
        return;
    }


    const unanswered =
        selectedAnswers.filter(
            answer => answer === null
        ).length;


    if (unanswered > 0) {

        const confirmSubmit =
            confirm(
                `You have ${unanswered} unanswered question(s). Do you want to submit?`
            );

        if (!confirmSubmit) {
            return;
        }

    }


    clearInterval(timerInterval);


    let score = 0;


    currentExam.questions.forEach(
        (question, index) => {

            if (
                selectedAnswers[index] ===
                question.answer
            ) {

                score++;

            }

        }
    );


    const total =
        currentExam.questions.length;


    const percentage =
        Math.round((score / total) * 100);


    document.getElementById("score").textContent =
        `${score}/${total}`;


    document.getElementById("percentage").textContent =
        `You scored ${percentage}% in this examination.`;


    document.getElementById("correctAnswers").textContent =
        score;


    document.getElementById("wrongAnswers").textContent =
        total - score;


    document.getElementById("totalQuestions").textContent =
        total;


    const resultMessage =
        document.getElementById("resultMessage");


    if (percentage >= 80) {

        resultMessage.textContent =
            "🏆 Excellent! Outstanding Performance!";

    } else if (percentage >= 60) {

        resultMessage.textContent =
            "👏 Great Job! Keep Improving!";

    } else if (percentage >= 40) {

        resultMessage.textContent =
            "👍 Good Attempt! Practice More!";

    } else {

        resultMessage.textContent =
            "📚 Keep Learning and Try Again!";

    }


    quizSection.classList.add("hidden");

    resultSection.classList.remove("hidden");


    resultSection.scrollIntoView({
        behavior: "smooth"
    });

}


/* ================= RESTART ================= */

function restartExam() {

    if (!currentExam) {
        return;
    }


    currentQuestion = 0;

    selectedAnswers =
        new Array(
            currentExam.questions.length
        ).fill(null);


    timeLeft =
        currentExam.duration * 60;


    resultSection.classList.add("hidden");

    quizSection.classList.remove("hidden");


    startTimer();

    displayQuestion();


    quizSection.scrollIntoView({
        behavior: "smooth"
    });

}


/* ================= BACK TO HOME ================= */

function backToHome() {

    clearInterval(timerInterval);

    currentExam = null;

    quizSection.classList.add("hidden");

    resultSection.classList.add("hidden");

    document.getElementById("home").classList.remove("hidden");

    document.querySelector(".features").classList.remove("hidden");

    examSection.classList.remove("hidden");

    document.getElementById("about").classList.remove("hidden");

    document.getElementById("contact").classList.remove("hidden");


    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });

}


/* ================= DARK MODE ================= */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (
        document.body.classList.contains("dark")
    ) {

        themeBtn.textContent = "☀️";

    } else {

        themeBtn.textContent = "🌙";

    }

});


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        alert("Please fill all fields.");

        return;

    }


    alert(
        `Thank you, ${name}! Your message has been submitted.`
    );


    contactForm.reset();

});
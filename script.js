const time = document.getElementById("time");
const date = document.getElementById("date");
const day = document.getElementById("day");


// =========================
// LIVE CLOCK
// =========================

function updateClock() {
    const now = new Date();

    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");

    time.textContent = `${hours}:${minutes}:${seconds}`;

    const days = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"
    ];

    day.textContent = days[now.getDay()];

    const months = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"
    ];

    date.textContent =
        `${String(now.getDate()).padStart(2, "0")} ` +
        `${months[now.getMonth()]} ` +
        `${now.getFullYear()}`;
}

setInterval(updateClock, 1000);
updateClock();


// =========================
// COLOUR CHANGING
// =========================

const colors = [
    "#00eaff",
    "#8a2be2",
    "#00ff88",
    "#ff00aa",
    "#ffb300",
    "#ff3333"
];

let colorIndex = 0;

function changeColor() {
    colorIndex++;

    if (colorIndex >= colors.length) {
        colorIndex = 0;
    }

    document.documentElement.style.setProperty(
        "--main-color",
        colors[colorIndex]
    );
}

setInterval(changeColor, 4000);


// =========================
// VOICE ASSISTANT
// =========================

// Browser speech recognition
const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.lang = "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function(event) {

        const userText =
            event.results[0][0].transcript.toLowerCase();

        console.log("Tumne kaha:", userText);

        understandQuestion(userText);
    };

    recognition.onerror = function(event) {
        console.log("Voice error:", event.error);
    };

} else {

    console.log("Speech Recognition browser me supported nahi hai.");

}


// =========================
// QUESTION SAMJHNA
// =========================

function understandQuestion(question) {

    // DATE
    if (
        question.includes("date") ||
        question.includes("tarikh") ||
        question.includes("तारीख") ||
        question.includes("तारिख") ||
        question.includes("aaj ki date") ||
        question.includes("aaj kya date") ||
        question.includes("aaj ki tarikh")
    ) {

        speak(getCurrentDate());
        return;
    }


    // DAY
    if (
        question.includes("kaunsa din") ||
        question.includes("kon sa din") ||
        question.includes("aaj ka din") ||
        question.includes("which day") ||
        question.includes("day kya hai")
    ) {

        speak(getCurrentDay());
        return;
    }


    // TIME
    if (
        question.includes("time") ||
        question.includes("kitne baje") ||
        question.includes("kitna baj") ||
        question.includes("samay")
    ) {

        speak(getCurrentTime());
        return;
    }


    // UNKNOWN QUESTION

    speak(
        "Sorry, abhi main sirf time, date aur day ke questions ka answer de sakti hoon."
    );
}


// =========================
// DATE ANSWER
// =========================

function getCurrentDate() {

    const now = new Date();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return `Aaj ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} hai.`;
}


// =========================
// DAY ANSWER
// =========================

function getCurrentDay() {

    const now = new Date();

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return `Aaj ${days[now.getDay()]} hai.`;
}


// =========================
// TIME ANSWER
// =========================

function getCurrentTime() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    let period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if (hours === 0) {
        hours = 12;
    }

    return `Abhi time ${hours}:${String(minutes).padStart(2, "0")} ${period} hai.`;
}


// =========================
// CLOCK KI VOICE
// =========================

function speak(text) {

    window.speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance(text);

    voice.lang = "hi-IN";
    voice.rate = 0.95;
    voice.pitch = 1;

    window.speechSynthesis.speak(voice);

    console.log("Clock:", text);
}


// =========================
// MICROPHONE START
// =========================

function startListening() {

    if (!recognition) {

        alert(
            "Tumhara browser voice recognition support nahi karta."
        );

        return;
    }

    recognition.start();
}


// Keyboard shortcut:
// M dabao = microphone start

document.addEventListener("keydown", function(event) {

    if (event.key.toLowerCase() === "m") {
        startListening();
    }

});

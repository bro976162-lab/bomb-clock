// ======================================
// ELEMENTS
// ======================================

const time = document.getElementById("time");
const date = document.getElementById("date");
const day = document.getElementById("day");

const micButton = document.getElementById("micButton");
const statusText = document.getElementById("status");


// ======================================
// LIVE CLOCK
// ======================================

function updateClock() {

    const now = new Date();

    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");


    time.textContent =
        `${hours}:${minutes}:${seconds}`;


    const days = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"
    ];


    day.textContent =
        days[now.getDay()];


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


// ======================================
// AUTOMATIC COLOUR
// ======================================

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


// ======================================
// VOICE RECOGNITION
// ======================================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


let recognition = null;


if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.lang = "hi-IN";

    recognition.continuous = false;

    recognition.interimResults = false;


    recognition.onstart = function () {

        statusText.textContent =
            "🎙️ Listening... bolo";

        micButton.textContent =
            "🔴 LISTENING";

    };


    recognition.onresult = function (event) {

        const spokenText =
            event.results[0][0].transcript
                .toLowerCase()
                .trim();


        console.log(
            "Tumne kaha:",
            spokenText
        );


        statusText.textContent =
            "Tumne kaha: " + spokenText;


        understandQuestion(spokenText);
    };


    recognition.onerror = function (event) {

        console.log(
            "Voice error:",
            event.error
        );


        statusText.textContent =
            "Voice error: " + event.error;

        micButton.textContent =
            "🎙️ TALK";
    };


    recognition.onend = function () {

        micButton.textContent =
            "🎙️ TALK";
    };

}


// ======================================
// START LISTENING
// ======================================

function startListening() {

    if (!recognition) {

        statusText.textContent =
            "Browser voice recognition support nahi karta.";

        return;
    }


    try {

        recognition.start();

    } catch (error) {

        console.log(error);

    }
}


// ======================================
// UNDERSTAND QUESTION
// ======================================

function understandQuestion(question) {


    // -------------------------------
    // DATE
    // -------------------------------

    const dateWords = [

        "date",

        "tarikh",

        "तारीख",

        "तारिख",

        "aaj ki date",

        "aaj kya date",

        "aaj ki tarikh",

        "aaj kya tarikh",

        "aaj ki tarik",

        "aaj kya tarik",

        "today date",

        "today ki date",

        "today kya date"

    ];


    if (
        dateWords.some(word =>
            question.includes(word)
        )
    ) {

        speak(getCurrentDate());

        return;
    }


    // -------------------------------
    // DAY
    // -------------------------------

    const dayWords = [

        "kaunsa din",

        "kaun sa din",

        "kon sa din",

        "aaj ka din",

        "aaj konsa din",

        "aaj kaunsa din",

        "which day",

        "day kya hai",

        "aaj kya din hai"

    ];


    if (
        dayWords.some(word =>
            question.includes(word)
        )
    ) {

        speak(getCurrentDay());

        return;
    }


    // -------------------------------
    // TIME
    // -------------------------------

    const timeWords = [

        "time",

        "kitne baje",

        "kitna baj",

        "kitne baj",

        "samay",

        "abhi kya time",

        "abhi kitne baje",

        "abhi kitna baj",

        "what time"

    ];


    if (
        timeWords.some(word =>
            question.includes(word)
        )
    ) {

        speak(getCurrentTime());

        return;
    }


    // -------------------------------
    // UNKNOWN
    // -------------------------------

    speak(
        "Sorry, abhi main sirf time, date aur day ke questions ka answer de sakti hoon."
    );
}


// ======================================
// GET CURRENT DATE
// ======================================

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


// ======================================
// GET CURRENT DAY
// ======================================

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


// ======================================
// GET CURRENT TIME
// ======================================

function getCurrentTime() {

    const now = new Date();


    let hours =
        now.getHours();

    let minutes =
        now.getMinutes();


    const period =
        hours >= 12 ? "PM" : "AM";


    hours =
        hours % 12;


    if (hours === 0) {
        hours = 12;
    }


    return `Abhi time ${hours}:${String(minutes).padStart(2, "0")} ${period} hai.`;
}


// ======================================
// SPEAK
// ======================================

function speak(text) {

    window.speechSynthesis.cancel();


    const voice =
        new SpeechSynthesisUtterance(text);


    voice.lang = "hi-IN";

    voice.rate = 0.95;

    voice.pitch = 1;


    window.speechSynthesis.speak(voice);


    statusText.textContent =
        text;


    console.log(
        "Clock:",
        text
    );
}

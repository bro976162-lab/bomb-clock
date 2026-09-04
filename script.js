const time = document.getElementById("time");
const date = document.getElementById("date");
const day = document.getElementById("day");

const colors = [
    "#00eaff",
    "#8a2be2",
    "#00ff88",
    "#ff00aa",
    "#ffb300",
    "#ff3333"
];

let colorIndex = 0;


// LIVE CLOCK

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // 24-hour format
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    time.textContent =
        `${hours}:${minutes}:${seconds}`;


    // Day

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


    // Date

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
        `${String(now.getDate()).padStart(2, "0")}
        ${months[now.getMonth()]}
        ${now.getFullYear()}`;
}


// CHANGE COLOUR

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


// Clock update every second

setInterval(updateClock, 1000);


// Change colour every 4 seconds

setInterval(changeColor, 4000);


// Start immediately

updateClock();

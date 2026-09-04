/* =========================================
   ELEMENTS
========================================= */

const time = document.getElementById("time");
const date = document.getElementById("date");
const day = document.getElementById("day");

const installBtn = document.getElementById("installBtn");
const appStatus = document.getElementById("appStatus");


/* =========================================
   COLORS
========================================= */

const colors = [
    "#00eaff",
    "#8a2be2",
    "#00ff88",
    "#ff00aa",
    "#ffb300",
    "#ff3333"
];

let colorIndex = 0;


/* =========================================
   LIVE CLOCK
========================================= */

function updateClock() {

    const now = new Date();

    /* -------------------------
       TIME
    ------------------------- */

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    time.textContent =
        `${hours}:${minutes}:${seconds}`;


    /* -------------------------
       DAY
    ------------------------- */

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


    /* -------------------------
       DATE
    ------------------------- */

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


/* =========================================
   CHANGE COLOR
========================================= */

function changeColor() {

    colorIndex++;

    if (colorIndex >= colors.length) {
        colorIndex = 0;
    }

    const newColor =
        colors[colorIndex];

    document.documentElement.style.setProperty(
        "--main-color",
        newColor
    );

    /* Change browser theme color */
    const themeColor =
        document.querySelector(
            'meta[name="theme-color"]'
        );

    if (themeColor) {
        themeColor.setAttribute(
            "content",
            newColor
        );
    }
}


/* =========================================
   PWA INSTALL
========================================= */

let deferredInstallPrompt = null;


/* Browser install prompt */

window.addEventListener(
    "beforeinstallprompt",
    function (event) {

        /* Stop browser from showing automatically */
        event.preventDefault();

        /* Save the event */
        deferredInstallPrompt = event;

        /* Show our button */
        if (installBtn) {
            installBtn.hidden = false;
        }

        console.log(
            "PWA install available."
        );
    }
);


/* =========================================
   INSTALL BUTTON CLICK
========================================= */

if (installBtn) {

    installBtn.addEventListener(
        "click",
        async function () {

            if (!deferredInstallPrompt) {

                alert(
                    "Install option abhi available nahi hai. Browser ke menu me 'Install App' ya 'Add to Home Screen' check karo."
                );

                return;
            }

            /* Show browser install dialog */

            deferredInstallPrompt.prompt();

            const result =
                await deferredInstallPrompt.userChoice;

            console.log(
                "Install result:",
                result.outcome
            );

            /* Clear prompt */

            deferredInstallPrompt = null;

            /* Hide button */

            installBtn.hidden = true;
        }
    );
}


/* =========================================
   APP INSTALLED
========================================= */

window.addEventListener(
    "appinstalled",
    function () {

        console.log(
            "Future Clock installed successfully."
        );

        deferredInstallPrompt = null;

        if (installBtn) {
            installBtn.hidden = true;
        }

        if (appStatus) {
            appStatus.textContent =
                "FUTURE CLOCK • INSTALLED";
        }
    }
);


/* =========================================
   SERVICE WORKER
========================================= */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        function () {

            navigator.serviceWorker
                .register("./service-worker.js")
                .then(function (registration) {

                    console.log(
                        "Service Worker registered:",
                        registration.scope
                    );

                })
                .catch(function (error) {

                    console.error(
                        "Service Worker registration failed:",
                        error
                    );

                });
        }
    );
}


/* =========================================
   PWA / APP MODE DETECTION
========================================= */

function checkAppMode() {

    const isStandalone =
        window.matchMedia(
            "(display-mode: standalone)"
        ).matches ||
        window.navigator.standalone === true;

    if (isStandalone) {

        if (appStatus) {
            appStatus.textContent =
                "FUTURE CLOCK • APP MODE";
        }

        if (installBtn) {
            installBtn.hidden = true;
        }
    }
}


/* =========================================
   START CLOCK
========================================= */

updateClock();


/* Update clock every second */

setInterval(
    updateClock,
    1000
);


/* Change color every 4 seconds */

setInterval(
    changeColor,
    4000
);


/* Check app mode */

checkAppMode();

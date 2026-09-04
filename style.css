* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


:root {
    --main-color: #00eaff;
}


body {

    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background:
        radial-gradient(
            circle at center,
            #17202a 0%,
            #070a0f 45%,
            #000000 100%
        );

    font-family: Arial, sans-serif;

    overflow: hidden;

    color: white;
}


/* Main container */

.container {

    width: 100%;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    padding: 20px;
}


/* CLOCK */

.clock {

    width: min(380px, 85vw);

    aspect-ratio: 1 / 1;

    position: relative;

    display: flex;

    justify-content: center;

    align-items: center;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(0, 234, 255, 0.10),
            rgba(0, 0, 0, 0.95) 68%
        );

    box-shadow:

        0 0 25px var(--main-color),

        0 0 60px rgba(0, 0, 0, 0.8),

        inset 0 0 35px rgba(255,255,255,0.04);

    transition: 1s;

    transform:
        perspective(800px)
        rotateX(6deg);
}


/* Rings */

.ring {

    position: absolute;

    border-radius: 50%;

    border: 2px solid var(--main-color);

    transition: 1s;
}


.ring1 {

    width: 92%;
    height: 92%;

    border-left-color: transparent;
    border-right-color: transparent;

    animation:
        rotateClockwise
        8s
        linear
        infinite;
}


.ring2 {

    width: 82%;
    height: 82%;

    border-top-color: transparent;
    border-bottom-color: transparent;

    animation:
        rotateAnti
        6s
        linear
        infinite;
}


.ring3 {

    width: 74%;
    height: 74%;

    border-style: dashed;

    opacity: 0.5;

    animation:
        rotateClockwise
        15s
        linear
        infinite;
}


/* Clock content */

.clock-content {

    text-align: center;

    z-index: 10;

    width: 90%;
}


.day {

    color: var(--main-color);

    font-size: clamp(11px, 3vw, 15px);

    letter-spacing: 6px;

    margin-bottom: 12px;

    text-shadow:
        0 0 12px var(--main-color);
}


.time {

    color: white;

    font-size: clamp(32px, 10vw, 48px);

    font-weight: bold;

    letter-spacing: 3px;

    white-space: nowrap;

    text-shadow:

        0 0 10px var(--main-color),

        0 0 25px var(--main-color);

    transition: 1s;
}


.date {

    color: #bdbdbd;

    font-size: clamp(9px, 2.5vw, 13px);

    letter-spacing: 3px;

    margin-top: 14px;
}


.location {

    color: var(--main-color);

    font-size: clamp(7px, 2vw, 9px);

    letter-spacing: 3px;

    margin-top: 18px;

    opacity: 0.8;
}


/* Decorative dots */

.dot {

    position: absolute;

    width: 8px;
    height: 8px;

    background: var(--main-color);

    border-radius: 50%;

    box-shadow:
        0 0 15px var(--main-color);

    transition: 1s;
}


.dot1 {
    top: 5%;
    left: 50%;
}


.dot2 {
    right: 5%;
    top: 50%;
}


.dot3 {
    bottom: 5%;
    left: 50%;
}


.dot4 {
    left: 5%;
    top: 50%;
}


/* Voice area */

.voice-area {

    margin-top: 55px;

    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 12px;
}


/* Talk button */

#micButton {

    border: 1px solid var(--main-color);

    border-radius: 50px;

    padding: 13px 28px;

    background:
        rgba(0, 0, 0, 0.6);

    color: var(--main-color);

    font-size: 14px;

    font-weight: bold;

    letter-spacing: 2px;

    cursor: pointer;

    box-shadow:
        0 0 15px var(--main-color);

    transition: 0.3s;
}


#micButton:hover {

    transform: scale(1.05);

    box-shadow:
        0 0 30px var(--main-color);
}


#micButton:active {

    transform: scale(0.95);
}


/* Status */

#status {

    color: #999;

    font-size: 12px;

    text-align: center;

    min-height: 18px;
}


/* Animations */

@keyframes rotateClockwise {

    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}


@keyframes rotateAnti {

    from {
        transform: rotate(360deg);
    }

    to {
        transform: rotate(0deg);
    }
}


/* Small phones */

@media (max-width: 360px) {

    .container {
        padding: 12px;
    }

    .clock {
        width: 88vw;
    }

    .day {
        letter-spacing: 4px;
    }

    .time {
        letter-spacing: 1px;
    }

    .date {
        letter-spacing: 2px;
    }
}


/* Landscape mobile */

@media (max-height: 550px) {

    .clock {
        width: min(280px, 55vh);
    }

    .voice-area {
        margin-top: 25px;
    }
}

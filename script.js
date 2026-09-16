/* =========================================================
   SELECT ELEMENTS
========================================================= */

const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const mainContent = document.getElementById("mainContent");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const heartsContainer =
    document.querySelector(".hearts-container");

const envelope =
    document.getElementById("envelope");

const openLetter =
    document.getElementById("openLetter");

const giftBox =
    document.getElementById("giftBox");

const giftText =
    document.getElementById("giftText");

const finalSection =
    document.getElementById("finalSection");


/* =========================================================
   START SURPRISE
========================================================= */

startBtn.addEventListener("click", function () {

    // Hide intro
    intro.classList.add("hide");

    // Show main website
    mainContent.classList.remove("hidden");

    // Try to start music
    music.play()
        .then(() => {

            musicBtn.textContent = "🔊";

        })
        .catch(() => {

            musicBtn.textContent = "🎵";

        });

    // Start floating hearts
    startHeartAnimation();

});


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicBtn.addEventListener("click", function () {

    if (music.paused) {

        music.play();

        musicBtn.textContent = "🔊";

    } else {

        music.pause();

        musicBtn.textContent = "🎵";

    }

});


/* =========================================================
   FLOATING HEARTS
========================================================= */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add("floating-heart");

    heart.innerHTML =
        Math.random() > 0.5
            ? "♡"
            : "♥";

    // Random horizontal position
    heart.style.left =
        Math.random() * 100 + "%";

    // Random size
    const size =
        Math.random() * 20 + 12;

    heart.style.fontSize =
        size + "px";

    // Random animation duration
    const duration =
        Math.random() * 5 + 5;

    heart.style.animationDuration =
        duration + "s";

    heartsContainer.appendChild(heart);

    // Remove after animation
    setTimeout(() => {

        heart.remove();

    }, duration * 1000);

}


function startHeartAnimation() {

    setInterval(() => {

        createHeart();

    }, 700);

}


/* =========================================================
   OPEN LETTER
========================================================= */

openLetter.addEventListener("click", function () {

    envelope.classList.toggle("open");

    if (envelope.classList.contains("open")) {

        openLetter.textContent =
            "Close My Letter 💌";

    } else {

        openLetter.textContent =
            "Open My Letter 💌";

    }

});


/* =========================================================
   GIFT BOX
========================================================= */

giftBox.addEventListener("click", function () {

    if (giftBox.classList.contains("open")) {
        return;
    }

    giftBox.classList.add("open");

    giftText.innerHTML =
        "You found the surprise... ❤️";

    // Create lots of hearts
    for (let i = 0; i < 30; i++) {

        setTimeout(() => {

            createHeart();

        }, i * 100);

    }

    // Reveal final section
    setTimeout(() => {

        finalSection.scrollIntoView({
            behavior: "smooth"
        });

    }, 1200);

});


/* =========================================================
   GALLERY CLICK
========================================================= */

const galleryImages =
    document.querySelectorAll(".gallery-card img");

galleryImages.forEach(image => {

    image.addEventListener("click", function () {

        const imageWindow =
            window.open("");

        imageWindow.document.write(`

            <html>

            <head>

                <title>Pari ❤️</title>

                <style>

                    body {
                        margin:0;
                        background:#09060d;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        min-height:100vh;
                    }

                    img {
                        max-width:95%;
                        max-height:95vh;
                        object-fit:contain;
                    }

                </style>

            </head>

            <body>

                <img src="${this.src}">

            </body>

            </html>

        `);

    });

});


/* =========================================================
   REVEAL ANIMATION ON SCROLL
========================================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


const revealElements =
    document.querySelectorAll(
        ".timeline-item, .love-card, .gallery-card"
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(40px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(element);

});
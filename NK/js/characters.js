/* =====================================================
   VAR STUDIO — CHARACTERS SLIDER
===================================================== */


/* ==========================================
   CHARACTER DATA
========================================== */

const characters = [

    {
        image: "../images/char1.jpg",

        name: "Minh Thông",

        role: "MANAGER"

    },

    {
        image: "../images/char2.jpg",

        name: "Hanie",

        role: "PERSONAL ASSISTANT, TASK MANAGEMENT"

    },

    {
        image: "../images/char3.jpg",

        name: "Khôi Nguyên",

        role: "WEB DESIGNER, INFORMATION AGGREGATOR"

    },

    {
        image: "../images/char4 ver2.jpg",

        name: "Huy Thông",

        role: "CAMERA OPERATOR"

    },

    {
        image: "../images/char5.jpg",

        name: "Trí Lâm",

        role: "CAMERA OPERATOR, LIGHTING DESIGNER"

    }

];


/* ==========================================
   VARIABLES
========================================== */

let currentIndex = 1;

let startX = 0;

let isDragging = false;


/* ==========================================
   ELEMENTS
========================================== */

const slider =
    document.getElementById(
        "characterSlider"
    );


const currentNumber =
    document.getElementById(
        "currentNumber"
    );


const totalNumber =
    document.getElementById(
        "totalNumber"
    );


const prevButton =
    document.getElementById(
        "prevCharacter"
    );


const nextButton =
    document.getElementById(
        "nextCharacter"
    );


/* ==========================================
   TOTAL
========================================== */

totalNumber.textContent =
    String(characters.length)
        .padStart(2, "0");


/* ==========================================
   CREATE CARDS
========================================== */

characters.forEach(
    function(character, index) {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "character-card";


        card.dataset.index =
            index;


        card.innerHTML = `

            <img
                src="${character.image}"
                alt="${character.name}"
            >

            <div class="card-info">

                <div class="card-number">
                    ${String(index + 1).padStart(2, "0")}
                    / ${String(characters.length).padStart(2, "0")}
                </div>

                <div class="card-name">
                    ${character.name}
                </div>

                <div class="card-role">
                    ${character.role}
                </div>

            </div>

        `;


        card.addEventListener(
            "click",
            function() {

                currentIndex = index;

                updateSlider();

            }
        );


        slider.appendChild(card);

    }
);


/* ==========================================
   UPDATE SLIDER
========================================== */

function updateSlider() {

    const cards =
        document.querySelectorAll(
            ".character-card"
        );


    cards.forEach(
        function(card, index) {

            card.className =
                "character-card";


            let difference =
                index - currentIndex;


            /*
             * Handle circular slider
             */

            if (
                difference >
                characters.length / 2
            ) {

                difference -=
                    characters.length;

            }


            if (
                difference <
                -characters.length / 2
            ) {

                difference +=
                    characters.length;

            }


            /* CENTER */

            if (difference === 0) {

                card.classList.add(
                    "center"
                );

            }


            /* LEFT */

            else if (difference === -1) {

                card.classList.add(
                    "left"
                );

            }


            /* RIGHT */

            else if (difference === 1) {

                card.classList.add(
                    "right"
                );

            }


            /* FAR LEFT */

            else if (difference === -2) {

                card.classList.add(
                    "far-left"
                );

            }


            /* FAR RIGHT */

            else if (difference === 2) {

                card.classList.add(
                    "far-right"
                );

            }


            /* HIDDEN */

            else {

                card.classList.add(
                    "hidden"
                );

            }

        }
    );


    /*
     * Update number
     */

    currentNumber.textContent =
        String(currentIndex + 1)
            .padStart(2, "0");


    /*
     * Update role
     */

    const roleElement =
        document.querySelector(
            ".character-role"
        );


    roleElement.textContent =
        characters[currentIndex].role;

}


/* ==========================================
   NEXT
========================================== */

function nextCharacter() {

    currentIndex++;

    if (
        currentIndex >=
        characters.length
    ) {

        currentIndex = 0;

    }


    updateSlider();

}


/* ==========================================
   PREVIOUS
========================================== */

function previousCharacter() {

    currentIndex--;

    if (
        currentIndex < 0
    ) {

        currentIndex =
            characters.length - 1;

    }


    updateSlider();

}


/* ==========================================
   BUTTONS
========================================== */

nextButton.addEventListener(
    "click",
    nextCharacter
);


prevButton.addEventListener(
    "click",
    previousCharacter
);


/* ==========================================
   KEYBOARD
========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowRight"
        ) {

            nextCharacter();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousCharacter();

        }

    }
);


/* ==========================================
   MOUSE DRAG
========================================== */

slider.addEventListener(
    "mousedown",
    function(event) {

        isDragging = true;

        startX = event.clientX;

    }
);


window.addEventListener(
    "mouseup",
    function(event) {

        if (!isDragging) {

            return;

        }


        isDragging = false;


        const difference =
            event.clientX - startX;


        if (
            Math.abs(difference) > 60
        ) {

            if (difference < 0) {

                nextCharacter();

            }

            else {

                previousCharacter();

            }

        }

    }
);


/* ==========================================
   TOUCH SWIPE
========================================== */

slider.addEventListener(
    "touchstart",
    function(event) {

        startX =
            event.touches[0].clientX;

    },
    {
        passive: true
    }
);


slider.addEventListener(
    "touchend",
    function(event) {

        const endX =
            event.changedTouches[0].clientX;


        const difference =
            endX - startX;


        if (
            Math.abs(difference) > 50
        ) {

            if (difference < 0) {

                nextCharacter();

            }

            else {

                previousCharacter();

            }

        }

    },
    {
        passive: true
    }
);


/* ==========================================
   INITIALIZE
========================================== */

updateSlider();

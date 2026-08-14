/* =====================================================
   SERVICE BOOKING JAVASCRIPT
===================================================== */


/* =====================================================
   VARIABLES
===================================================== */

let selectedSession = "morning";

let selectedTime = "";


/* =====================================================
   TIME DATA
===================================================== */

const times = {

    morning: [

        "08:00",
        "08:15",
        "08:30",
        "08:45",

        "09:00",
        "09:15",
        "09:30",
        "09:45",

        "10:00",
        "10:15",
        "10:30",
        "10:45",

        "11:00",
        "11:15",
        "11:30",
        "11:45"

    ],


    afternoon: [

        "12:00",
        "12:15",
        "12:30",
        "12:45",

        "13:00",
        "13:15",
        "13:30",
        "13:45",

        "14:00",
        "14:15",
        "14:30",
        "14:45",

        "15:00",
        "15:15",
        "15:30",
        "15:45"

    ],


    evening: [

        "17:00",
        "17:15",
        "17:30",
        "17:45",

        "18:00",
        "18:15",
        "18:30",
        "18:45",

        "19:00",
        "19:15",
        "19:30",
        "19:45",

        "20:00",
        "20:15",
        "20:30",
        "20:45"

    ]

};


/* =====================================================
   ELEMENTS
===================================================== */

const timeGrid =
    document.getElementById("timeGrid");


const bookingDate =
    document.getElementById("bookingDate");


const sessionInput =
    document.getElementById("sessionInput");


const timeInput =
    document.getElementById("timeInput");


const serviceSelect =
    document.getElementById("service");


const bookingForm =
    document.getElementById("bookingForm");


const submitButton =
    document.getElementById("submitButton");


const bookingStatus =
    document.getElementById("bookingStatus");


/* =====================================================
   RENDER TIMES
===================================================== */

function renderTimes(session) {

    timeGrid.innerHTML = "";

    selectedTime = "";

    timeInput.value = "";


    times[session].forEach(
        function(time) {

            const button =
                document.createElement("button");


            button.type = "button";

            button.className = "time-btn";

            button.textContent = time;


            button.addEventListener(
                "click",
                function() {

                    document
                        .querySelectorAll(".time-btn")
                        .forEach(
                            function(btn) {

                                btn.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    this.classList.add(
                        "selected"
                    );


                    selectedTime = time;

                    timeInput.value = time;

                }
            );


            timeGrid.appendChild(button);

        }
    );

}


/* =====================================================
   SESSION BUTTONS
===================================================== */

document
    .querySelectorAll(".session-btn")
    .forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    document
                        .querySelectorAll(".session-btn")
                        .forEach(
                            function(btn) {

                                btn.classList.remove(
                                    "active"
                                );

                            }
                        );


                    this.classList.add(
                        "active"
                    );


                    selectedSession =
                        this.dataset.session;


                    sessionInput.value =
                        selectedSession;


                    renderTimes(
                        selectedSession
                    );

                }
            );

        }
    );


/* =====================================================
   SERVICE CARD
===================================================== */

function selectService(service) {

    serviceSelect.value = service;


    document
        .getElementById("booking")
        .scrollIntoView({

            behavior: "smooth"

        });

}


/* =====================================================
   MINIMUM DATE
===================================================== */

const todayDate = new Date();
const today = [
    todayDate.getFullYear(),
    String(todayDate.getMonth() + 1).padStart(2, "0"),
    String(todayDate.getDate()).padStart(2, "0")
].join("-");


bookingDate.min = today;


/* =====================================================
   INITIAL SESSION
===================================================== */

sessionInput.value =
    selectedSession;


/* =====================================================
   INITIAL TIME
===================================================== */

renderTimes(
    selectedSession
);


/* =====================================================
   FORM SUBMIT
===================================================== */

bookingForm.addEventListener(
    "submit",
    function(event) {

        /*
         * Không cho gửi nếu
         * chưa chọn ngày.
         */

        if (!bookingDate.value) {

            event.preventDefault();

            showError(
                "Please select a date."
            );

            return;

        }


        /*
         * Không cho gửi nếu
         * chưa chọn giờ.
         */

        if (!selectedTime) {

            event.preventDefault();

            showError(
                "Please select a time."
            );

            return;

        }


        /*
         * Cập nhật dữ liệu
         */

        sessionInput.value =
            selectedSession;


        timeInput.value =
            selectedTime;


        /*
         * Disable button
         */

        submitButton.disabled = true;

        submitButton.textContent =
            "Sending Booking...";

        bookingStatus.className = "";
        bookingStatus.style.display = "block";
        bookingStatus.textContent = "Sending your booking request...";

    }
);


/* =====================================================
   ERROR MESSAGE
===================================================== */

function showError(message) {

    bookingStatus.className =
        "error";


    bookingStatus.style.display =
        "block";


    bookingStatus.textContent =
        message;


    setTimeout(
        function() {

            bookingStatus.style.display =
                "none";

        },
        4000
    );

}

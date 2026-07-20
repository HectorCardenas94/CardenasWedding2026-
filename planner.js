// =======================================
// NEXO v1.1 Dashboard
// =======================================

// Demo Data
const dashboard = {
    guests: 152,
    confirmed: 119,
    pending: 33,
    progress: 72
};

// ----------------------------
// Greeting
// ----------------------------

const greeting = document.getElementById("greeting");

function updateGreeting(){

    const hour = new Date().getHours();

    let message = "Good Evening";

    if(hour < 12){
        message = "Good Morning";
    }
    else if(hour < 18){
        message = "Good Afternoon";
    }

    greeting.innerHTML = `${message}, Hector 👋`;

}

updateGreeting();

// ----------------------------
// Progress Bar
// ----------------------------

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

function updateProgress(value){

    progressFill.style.width = value + "%";

    progressPercent.innerHTML = value + "%";

}

updateProgress(dashboard.progress);

// ----------------------------
// Dashboard Numbers
// ----------------------------

document.getElementById("guestCount").innerHTML =
dashboard.guests;

document.getElementById("confirmedCount").innerHTML =
dashboard.confirmed;

document.getElementById("pendingCount").innerHTML =
dashboard.pending;

// ----------------------------
// Card Animation
// ----------------------------

const cards = document.querySelectorAll(".stat-card");

cards.forEach((card,index)=>{

    card.style.opacity="0";
    card.style.transform="translateY(25px)";

    setTimeout(()=>{

        card.style.transition=".45s ease";

        card.style.opacity="1";

        card.style.transform="translateY(0)";

    },150*index);

});

// ----------------------------
// Quick Buttons
// ----------------------------

const buttons =
document.querySelectorAll(".quick-buttons button");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

    alert("Coming in NEXO v1.2 🚀");

});

});

// ----------------------------
// Future Firebase Hooks
// ----------------------------

// Future:
//
// loadFamilies();
//
// loadRSVPs();
//
// loadMessages();
//
// loadProgress();
//
// updateDashboard();
//
// ----------------------------

console.log("🚀 NEXO v1.1 Loaded Successfully");
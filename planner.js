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

// ==========================
// Navigation
// ==========================

const workspace = document.getElementById("workspace");

function setActive(link){

    document.querySelectorAll("nav a").forEach(item=>{
        item.classList.remove("active");
    });

    link.classList.add("active");

}

function showDashboard(link){

    if(link) setActive(link);

    location.reload();

}

function showFamilies(link){

    if(link) setActive(link);

    workspace.innerHTML = `

    <h2>Families</h2>

    <br>

    <input
    type="text"
    placeholder="🔍 Search Families"
    style="
    width:100%;
    padding:16px;
    border-radius:14px;
    border:1px solid #ddd;
    margin-bottom:20px;
    font-size:16px;
    ">

    <button
    style="
    background:#b8924f;
    color:white;
    border:none;
    padding:16px 24px;
    border-radius:14px;
    font-size:16px;
    font-weight:600;
    cursor:pointer;
    margin-bottom:25px;
    ">
    ➕ Add Family
    </button>

    <div class="panel">

        <h3>Cardenas Family</h3>

        <p>Guests: 5</p>

        <p>✅ RSVP Complete</p>

    </div>

    <br>

    <div class="panel">

        <h3>Garcia Family</h3>

        <p>Guests: 4</p>

        <p>⌛ Pending</p>

    </div>

    `;

}

function showRSVPs(link){

    if(link) setActive(link);

    workspace.innerHTML=`

    <h2>RSVP Manager</h2>

    <br>

    <div class="panel">

    Coming in Alpha 0.3 🚀

    </div>

    `;

}

function showMessages(link){

    if(link) setActive(link);

    workspace.innerHTML=`

    <h2>Messages</h2>

    <br>

    <div class="panel">

    No new messages.

    </div>

    `;

}

function showSettings(link){

    if(link) setActive(link);

    workspace.innerHTML=`

    <h2>Settings</h2>

    <br>

    <div class="panel">

    Event Settings

    </div>

    `;

}
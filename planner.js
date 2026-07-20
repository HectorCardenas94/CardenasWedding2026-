/* ==========================================================
   NEXO Alpha 0.3
   planner.js
   PART 1 / 3
========================================================== */

"use strict";

/* ==========================================================
   App
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

function initializeApp() {

    updateGreeting();

    updateProgress(72);

    setActiveNavigation();

}

/* ==========================================================
   Greeting
========================================================== */

function updateGreeting() {

    const greeting = document.getElementById("greeting");

    if (!greeting) return;

    const hour = new Date().getHours();

    let message = "Good Evening";

    if (hour < 12) {

        message = "Good Morning";

    } else if (hour < 18) {

        message = "Good Afternoon";

    }

    greeting.textContent = `${message}, Hector 👋`;

}

/* ==========================================================
   Progress
========================================================== */

function updateProgress(percent) {

    const fill = document.getElementById("progressFill");

    const label = document.getElementById("progressPercent");

    if (fill) {

        fill.style.width = percent + "%";

    }

    if (label) {

        label.textContent = percent + "%";

    }

}

/* ==========================================================
   Navigation
========================================================== */

function setActiveNavigation() {

    const links = document.querySelectorAll(".sidebar nav a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            links.forEach(item => item.classList.remove("active"));

            link.classList.add("active");

        });

    });

}

/* ==========================================================
   Dashboard
========================================================== */

function showDashboard() {

    console.log("Dashboard Loaded");

}/* ==========================================================
   Toast Notifications
========================================================== */

function showToast(message = "Saved Successfully") {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(showToast.timeout);

    showToast.timeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* ==========================================================
   Modal System
========================================================== */

function openModal(content = "") {

    const overlay = document.getElementById("modalOverlay");

    const modal = document.getElementById("modalContent");

    if (!overlay || !modal) return;

    modal.innerHTML = content;

    overlay.style.display = "flex";

}

function closeModal() {

    const overlay = document.getElementById("modalOverlay");

    if (!overlay) return;

    overlay.style.display = "none";

}

document.addEventListener("click", (event) => {

    const overlay = document.getElementById("modalOverlay");

    if (!overlay) return;

    if (event.target === overlay) {

        closeModal();

    }

});


/* ==========================================================
   Dashboard Data
========================================================== */

function updateGuestStats(total, confirmed, pending) {

    const guestCount = document.getElementById("guestCount");

    const confirmedCount = document.getElementById("confirmedCount");

    const pendingCount = document.getElementById("pendingCount");

    if (guestCount) guestCount.textContent = total;

    if (confirmedCount) confirmedCount.textContent = confirmed;

    if (pendingCount) pendingCount.textContent = pending;

}


/* ==========================================================
   Animated Progress
========================================================== */

function animateProgress(targetPercent) {

    let current = 0;

    const interval = setInterval(() => {

        current++;

        updateProgress(current);

        if (current >= targetPercent) {

            clearInterval(interval);

        }

    }, 15);

}/* ==========================================================
   Navigation Pages
========================================================== */

function showFamilies() {

    showToast("Families module coming soon");

    console.log("Families");

}

function showInvitations() {

    showToast("Invitations module coming soon");

    console.log("Invitations");

}

function showWebsite() {

    showToast("Website Builder coming soon");

    console.log("Website");

}

function showAnalytics() {

    showToast("Analytics coming soon");

    console.log("Analytics");

}

function showSettings() {

    showToast("Settings coming soon");

    console.log("Settings");

}


/* ==========================================================
   Quick Actions
========================================================== */

function addFamily() {

    openModal(`

        <h2>Add Family</h2>

        <p>This feature will be built in Alpha 0.4.</p>

        <br>

        <button class="btn btn-primary" onclick="closeModal()">

            Close

        </button>

    `);

}

function openWebsiteEditor() {

    showWebsite();

}

function sendReminder() {

    showToast("Reminder sent (demo)");

}

function viewAnalytics() {

    showAnalytics();

}


/* ==========================================================
   Utilities
========================================================== */

function formatNumber(value) {

    return Number(value).toLocaleString();

}

function setDashboardData(data) {

    updateGuestStats(

        data.totalGuests,

        data.confirmedGuests,

        data.pendingGuests

    );

    updateProgress(data.progress);

}


/* ==========================================================
   Demo Data
========================================================== */

const dashboardData = {

    totalGuests: 152,

    confirmedGuests: 119,

    pendingGuests: 33,

    progress: 72

};

setDashboardData(dashboardData);


/* ==========================================================
   Future Expansion
========================================================== */

// Families Module
// Invitations Module
// Website Builder
// Analytics Dashboard
// Settings Manager
// Authentication
// Database Integration
// API Layer
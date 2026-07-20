"use strict";

/* ==========================================================
   NEXO Alpha 0.3
   Application Engine
========================================================== */

document.addEventListener("DOMContentLoaded", init);

function init() {

    loadDashboard();

}

/* ==========================================================
   Navigation
========================================================== */

function activateNav(link){

    document
        .querySelectorAll(".sidebar nav a")
        .forEach(a=>a.classList.remove("active"));

    if(link){

        link.classList.add("active");

    }

}

function showDashboard(event,link){

    if(event) event.preventDefault();

    activateNav(link);

    loadDashboard();

}

function showFamilies(event,link){

    if(event) event.preventDefault();

    activateNav(link);

    loadFamilies();

}

function showInvitations(event,link){

    if(event) event.preventDefault();

    activateNav(link);

    loadPlaceholder("Invitations");

}

function showWebsite(event,link){

    if(event) event.preventDefault();

    activateNav(link);

    loadPlaceholder("Website");

}

function showAnalytics(event,link){

    if(event) event.preventDefault();

    activateNav(link);

    loadPlaceholder("Analytics");

}

function showSettings(event,link){

    if(event) event.preventDefault();

    activateNav(link);

    loadPlaceholder("Settings");

}

/* ==========================================================
   Dashboard
========================================================== */

function loadDashboard(){

const page=document.getElementById("pageContainer");

page.innerHTML=`

<header class="top-header">

<div>

<h2 id="greeting">

Welcome to NEXO 👋

</h2>

<p class="subtitle">

Everything starts here.

</p>

<p class="date">

Alpha 0.3

</p>

</div>

</header>

<section class="progress-card">

<div class="progress-header">

<h3>Planning Progress</h3>

<span>72%</span>

</div>

<div class="progress-bar">

<div class="progress-fill" style="width:72%"></div>

</div>

<p class="progress-text">

Ready to start building your event.

</p>

</section>

<section class="stats-grid">

<div class="stat-card">

<h4>Families</h4>

<h1>0</h1>

<p>No families yet</p>

</div>

<div class="stat-card">

<h4>Guests</h4>

<h1>0</h1>

<p>No guests yet</p>

</div>

<div class="stat-card">

<h4>Confirmed</h4>

<h1>0</h1>

<p>No RSVPs yet</p>

</div>

</section>

`;

}

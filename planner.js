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

    loadInvitations();

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
/* ==========================================================
   Shared Helpers
========================================================== */

function loadPlaceholder(title){

const page=document.getElementById("pageContainer");

page.innerHTML=`

<header class="top-header">

<div>

<h2>${title}</h2>

<p class="subtitle">

This module is currently under construction.

</p>

</div>

</header>

<section class="card">

<h3>

${title}

</h3>

<p>

We're building this module next.

</p>

</section>

`;

}

/* ==========================================================
   Toast
========================================================== */

function showToast(message){

const toast=document.getElementById("toast");

if(!toast) return;

toast.textContent=message;

toast.classList.add("show");

clearTimeout(window.toastTimer);

window.toastTimer=setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

/* ==========================================================
   Modal
========================================================== */

function openModal(html){

const overlay=document.getElementById("modalOverlay");

const modal=document.getElementById("modalContent");

modal.innerHTML=html;

overlay.style.display="flex";

}

function closeModal(){

document.getElementById("modalOverlay").style.display="none";

}

document.addEventListener("click",(e)=>{

const overlay=document.getElementById("modalOverlay");

if(e.target===overlay){

closeModal();

}

});

/* ==========================================================
   Families Module
========================================================== */

const STORAGE_KEY = "nexo_families";

function getFamilies(){

    const data = localStorage.getItem(STORAGE_KEY);

    if(!data) return [];

    try{

        return JSON.parse(data);

    }catch{

        return [];

    }

}

function saveFamilies(families){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(families)
    );

}

function loadFamilies(){

    const page = document.getElementById("pageContainer");

    const families = getFamilies();

    let rows = "";

    if(families.length===0){

        rows = `
        <tr>
            <td colspan="5" class="empty-state">
                No families added yet.
            </td>
        </tr>
        `;

    }else{

        families.forEach((family,index)=>{

            rows += `

            <tr>

                <td>${family.name}</td>

                <td>${family.guests}</td>

                <td>${family.phone || "-"}</td>

                <td>${family.status}</td>

                <td>

                    <button
class="primary-btn"
onclick="viewFamily(${index})">

Open

</button>

<button
class="secondary-btn"
onclick="editFamily(${index})">

Edit

</button>

                    <button
                        class="danger-btn"
                        onclick="deleteFamily(${index})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }

    page.innerHTML = `

<header class="top-header">

<div>

<h2>Families</h2>

<p class="subtitle">

Manage all invited families.

</p>

</div>

<button
class="primary-btn"
onclick="showAddFamilyModal()">

＋ Add Family

</button>

</header>

<section class="card">

<div class="toolbar">

<input

id="familySearch"

type="text"

placeholder="Search families..."

oninput="filterFamilies()">

</div>

<table class="data-table">

<thead>

<tr>

<th>Family</th>

<th>Guests</th>

<th>Phone</th>

<th>Status</th>

<th>Actions</th>

</tr>

</thead>

<tbody id="familyTable">

${rows}

</tbody>

</table>

</section>

`;

    updateDashboardStats();

}

function filterFamilies(){

    const search = document
        .getElementById("familySearch")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#familyTable tr");

    rows.forEach(row=>{

        row.style.display =
            row.textContent
                .toLowerCase()
                .includes(search)
                    ? ""
                    : "none";

    });

}

function showAddFamilyModal(){

    openModal(`

<h2>Add Family</h2>

<div class="form-group">

<label>Family Name</label>

<input
id="familyName"
type="text">

</div>

<div class="form-group">

<label>Guests</label>

<input
id="familyGuests"
type="number"
value="1"
min="1">

</div>

<div class="form-group">

<label>Phone</label>

<input
id="familyPhone"
type="text">

</div>

<div class="form-group">

<label>Status</label>

<select id="familyStatus">

<option>Pending</option>

<option>Confirmed</option>

<option>Declined</option>

</select>

</div>

<div class="modal-actions">

<button
class="secondary-btn"
onclick="closeModal()">

Cancel

</button>

<button
class="primary-btn"
onclick="addFamily()">

Save Family

</button>

</div>

`);

}

/* ==========================================================
   Families Actions
========================================================== */

function addFamily(){

    const name = document.getElementById("familyName").value.trim();
    const guests = parseInt(document.getElementById("familyGuests").value) || 1;
    const phone = document.getElementById("familyPhone").value.trim();
    const status = document.getElementById("familyStatus").value;

    if(name===""){

        showToast("Please enter a family name.");
        return;

    }

    const families = getFamilies();

    families.push({

        id: Date.now(),

        name,

        guests,

        phone,

        status

    });

    saveFamilies(families);

    closeModal();

    showToast("Family added successfully.");

    loadFamilies();

}

function editFamily(index){

    const families = getFamilies();

    const family = families[index];

    openModal(`

<h2>Edit Family</h2>

<div class="form-group">

<label>Family Name</label>

<input
id="familyName"
type="text"
value="${family.name}">

</div>

<div class="form-group">

<label>Guests</label>

<input
id="familyGuests"
type="number"
value="${family.guests}">

</div>

<div class="form-group">

<label>Phone</label>

<input
id="familyPhone"
type="text"
value="${family.phone}">

</div>

<div class="form-group">

<label>Status</label>

<select id="familyStatus">

<option ${family.status==="Pending"?"selected":""}>Pending</option>

<option ${family.status==="Confirmed"?"selected":""}>Confirmed</option>

<option ${family.status==="Declined"?"selected":""}>Declined</option>

</select>

</div>

<div class="modal-actions">

<button
class="secondary-btn"
onclick="closeModal()">

Cancel

</button>

<button
class="primary-btn"
onclick="saveEditedFamily(${index})">

Save Changes

</button>

</div>

`);

}

function saveEditedFamily(index){

    const families = getFamilies();

    families[index].name =
        document.getElementById("familyName").value.trim();

    families[index].guests =
        parseInt(document.getElementById("familyGuests").value) || 1;

    families[index].phone =
        document.getElementById("familyPhone").value.trim();

    families[index].status =
        document.getElementById("familyStatus").value;

    saveFamilies(families);

    closeModal();

    showToast("Family updated.");

    loadFamilies();

}

function deleteFamily(index){

    if(!confirm("Delete this family?")){

        return;

    }

    const families = getFamilies();

    families.splice(index,1);

    saveFamilies(families);

    showToast("Family deleted.");

    loadFamilies();

}

/* ==========================================================
   Dashboard Statistics
========================================================== */

function updateDashboardStats(){

    const families = getFamilies();

    const familyCount = families.length;

    let guestCount = 0;
    let confirmedCount = 0;

    families.forEach(family=>{

        guestCount += family.guests;

        if(family.status==="Confirmed"){

            confirmedCount += family.guests;

        }

    });

    const cards = document.querySelectorAll(".stat-card h1");

    if(cards.length>=3){

        cards[0].textContent = familyCount;
        cards[1].textContent = guestCount;
        cards[2].textContent = confirmedCount;

    }

}

/* ==========================================================
   Family Details
========================================================== */

function viewFamily(index){

    const families = getFamilies();

    const family = families[index];

    if(!family.members){

        family.members=[];

    }

    let rows="";

    if(family.members.length===0){

        rows=`

        <tr>

            <td colspan="4">

                No guests added.

            </td>

        </tr>

        `;

    }else{

        family.members.forEach((member,memberIndex)=>{

            rows+=`

            <tr>

                <td>${member.name}</td>

                <td>${member.meal}</td>

                <td>${member.rsvp}</td>

                <td>

                    <button
                    class="secondary-btn"
                    onclick="removeGuest(${index},${memberIndex})">

                    Remove

                    </button>

                </td>

            </tr>

            `;

        });

    }

    document.getElementById("pageContainer").innerHTML=`

<header class="top-header">

<div>

<h2>${family.name}</h2>

<p class="subtitle">

Manage guests for this family.

</p>

</div>

<div>

<button
class="secondary-btn"
onclick="loadFamilies()">

← Back

</button>

<button
class="primary-btn"
onclick="showAddGuestModal(${index})">

＋ Add Guest

</button>

</div>

</header>

<section class="stats-grid">

<div class="stat-card">

<h4>Total Guests</h4>

<h1>${family.guests}</h1>

</div>

<div class="stat-card">

<h4>Confirmed</h4>

<h1>${family.members.filter(m=>m.rsvp==="Confirmed").length}</h1>

</div>

<div class="stat-card">

<h4>Pending</h4>

<h1>${family.members.filter(m=>m.rsvp==="Pending").length}</h1>

</div>

</section>

<section class="card">

<table class="data-table">

<thead>

<tr>

<th>Name</th>

<th>Meal</th>

<th>RSVP</th>

<th></th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>

</section>

`;

}

/* ==========================================================
   Guest Modal
========================================================== */

function showAddGuestModal(familyIndex){

    openModal(`

<h2>Add Guest</h2>

<div class="form-group">

<label>Name</label>

<input
id="guestName"
type="text">

</div>

<div class="form-group">

<label>Meal</label>

<select id="guestMeal">

<option>Chicken</option>

<option>Beef</option>

<option>Vegetarian</option>

<option>Kids</option>

</select>

</div>

<div class="form-group">

<label>RSVP</label>

<select id="guestRSVP">

<option>Pending</option>

<option>Confirmed</option>

<option>Declined</option>

</select>

</div>

<div class="modal-actions">

<button
class="secondary-btn"
onclick="closeModal()">

Cancel

</button>

<button
class="primary-btn"
onclick="addGuest(${familyIndex})">

Save Guest

</button>

</div>

`);

}

function addGuest(index){

    const families=getFamilies();

    if(!families[index].members){

        families[index].members=[];

    }

    families[index].members.push({

        name:document.getElementById("guestName").value,

        meal:document.getElementById("guestMeal").value,

        rsvp:document.getElementById("guestRSVP").value

    });

    saveFamilies(families);

    closeModal();

    showToast("Guest added.");

    viewFamily(index);

}

function removeGuest(familyIndex,guestIndex){

    const families=getFamilies();

    families[familyIndex].members.splice(guestIndex,1);

    saveFamilies(families);
    

    showToast("Guest removed.");

    viewFamily(familyIndex);
    }
    
    /* ==========================================================
   Dashboard Data Engine
========================================================== */

const ACTIVITY_KEY = "nexo_activity";

function getActivity(){

    const data = localStorage.getItem(ACTIVITY_KEY);

    if(!data) return [];

    try{

        return JSON.parse(data);

    }catch{

        return [];

    }

}

function saveActivity(activity){

    localStorage.setItem(
        ACTIVITY_KEY,
        JSON.stringify(activity)
    );

}

function logActivity(action){

    const activity = getActivity();

    activity.unshift({

        action,

        time: new Date().toLocaleString()

    });

    if(activity.length > 15){

        activity.pop();

    }

    saveActivity(activity);

}

function calculateStats(){

    const families = getFamilies();

    let totalFamilies = families.length;

    let totalGuests = 0;
    let confirmedGuests = 0;
    let pendingGuests = 0;
    let declinedGuests = 0;

    families.forEach(family=>{

        totalGuests += Number(family.guests);

        if(family.members){

            family.members.forEach(member=>{

                switch(member.rsvp){

                    case "Confirmed":
                        confirmedGuests++;
                        break;

                    case "Declined":
                        declinedGuests++;
                        break;

                    default:
                        pendingGuests++;

                }

            });

        }

    });

    return{

        totalFamilies,
        totalGuests,
        confirmedGuests,
        pendingGuests,
        declinedGuests

    };

}

/* ==========================================================
   Dashboard Refresh
========================================================== */

function refreshDashboard(){

    const stats = calculateStats();

    const cards = document.querySelectorAll(".stat-card h1");

    if(cards.length < 3){

        return;

    }

    cards[0].textContent = stats.totalFamilies;
    cards[1].textContent = stats.totalGuests;
    cards[2].textContent = stats.confirmedGuests;

    const progress = document.querySelector(".progress-fill");

    const percent =

        stats.totalGuests===0
            ? 0
            : Math.round(
                (stats.confirmedGuests /
                 stats.totalGuests) * 100
            );

    if(progress){

        progress.style.width = percent + "%";

    }

    const percentText =
        document.querySelector(".progress-header span");

    if(percentText){

        percentText.textContent = percent + "%";

    }

}

/* ==========================================================
   Recent Activity Card
========================================================== */

function buildRecentActivity(){

    const activity = getActivity();

    if(activity.length===0){

        return `

        <div class="card">

            <h3>Recent Activity</h3>

            <p>No activity yet.</p>

        </div>

        `;

    }

    let html = `

    <div class="card">

        <h3>Recent Activity</h3>

        <ul class="activity-list">

    `;

    activity.forEach(item=>{

        html += `

        <li>

            <strong>${item.action}</strong>

            <br>

            <small>${item.time}</small>

        </li>

        `;

    });

    html += `

        </ul>

    </div>

    `;

    return html;

}


}

/* ==========================================================
   Families Utilities
========================================================== */

function sortFamilies(){

    const families = getFamilies();

    families.sort((a,b)=>{

        return a.name.localeCompare(b.name);

    });

    saveFamilies(families);

}

function familyExists(name){

    const families = getFamilies();

    return families.some(family=>

        family.name.toLowerCase() ===
        name.toLowerCase()

    );

}

function getFamily(index){

    return getFamilies()[index];

}

/* ==========================================================
   Validation
========================================================== */

function validateFamily(name, guests){

    if(name.trim()===""){

        showToast("Family name is required.");

        return false;

    }

    if(guests < 1){

        showToast("Guest count must be at least 1.");

        return false;

    }

    return true;

}


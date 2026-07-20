"use strict";
alert("Invitation Workspace Loaded");
/* ==========================================================
   NEXO Alpha 0.3
   Invitation Workspace Module
========================================================== */

function openInvitation(id){

    const invitations = getInvitations();

    const families = getFamilies();

    const invitation = invitations.find(
        inv => inv.id === id
    );

    if(!invitation){

        showToast("Invitation not found.");

        return;

    }

    const family = families.find(
        family => Number(family.id) === Number(invitation.familyId)
    );

    const page = document.getElementById("pageContainer");

    page.innerHTML = `

<header class="top-header">

<button
class="secondary-btn"
onclick="loadInvitations()">

← Back

</button>

<div>

<h2>

${family ? family.name : "Invitation"}

</h2>

<p class="subtitle">

Invitation Workspace

</p>

</div>

</header>

<section class="card">

<h3>Overview</h3>

<p><strong>Status:</strong> ${invitation.status}</p>

<p><strong>Guests:</strong> ${family ? family.guests : 0}</p>

<p><strong>Phone:</strong> ${family ? family.phone : "-"}</p>

</section>

<section class="card">

<h3>Workspace</h3>

<p>

Everything related to this invitation will be managed here.

</p>

<div class="button-row">

<button
class="primary-btn"
onclick="showToast('Coming Soon')">

Guest List

</button>

<button
class="primary-btn"
onclick="showToast('Coming Soon')">

Message

</button>

<button
class="primary-btn"
onclick="showToast('Coming Soon')">

Template

</button>

<button
class="primary-btn"
onclick="showToast('Coming Soon')">

Website

</button>

<button
class="primary-btn"
onclick="showToast('Coming Soon')">

QR Code

</button>

<button
class="primary-btn"
onclick="showToast('Coming Soon')">

Preview

</button>

</div>

</section>

`;

}

window.openInvitation = openInvitation;
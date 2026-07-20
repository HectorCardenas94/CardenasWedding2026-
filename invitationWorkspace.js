"use strict";

/* ==========================================================
   NEXO Alpha 0.3
   Invitation Workspace Module
========================================================== */



function openInvitation(id){

    const invitations = getInvitations();

    const families = JSON.parse(
        localStorage.getItem("nexo_families") || "[]"
    );

    const invitation = invitations.find(
        inv => inv.id === id
    );

    if(!invitation){

        showToast("Invitation not found.");

        return;

    }

    const family = families.find(
        f => Number(f.id) === Number(invitation.familyId)
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

        <h2>${family ? family.name : "Invitation"}</h2>

        <p class="subtitle">

            Invitation Workspace

        </p>

    </div>

</header>

<section class="card">

    <h3>Invitation Overview</h3>

    <p><strong>Status:</strong> ${invitation.status}</p>

    <p><strong>Guests:</strong> ${family ? family.guests : 0}</p>

    <p><strong>Phone:</strong> ${family ? family.phone : "-"}</p>

    <p><strong>Website:</strong> Not Published</p>

</section>

<section class="card">

    <h3>Quick Actions</h3>

    <div class="button-row">

        <button
            class="primary-btn"
            onclick="showToast('Guests Coming Soon')">

            Guests

        </button>

        <button
            class="primary-btn"
            onclick="showToast('RSVP Coming Soon')">

            RSVP

        </button>

        <button
            class="primary-btn"
            onclick="showToast('Website Coming Soon')">

            Website

        </button>

        <button
            class="primary-btn"
            onclick="showToast('Templates Coming Soon')">

            Templates

        </button>

        <button
            class="primary-btn"
            onclick="showToast('QR Code Coming Soon')">

            QR Code

        </button>

        <button
            class="primary-btn"
            onclick="showToast('Preview Coming Soon')">

            Preview

        </button>

    </div>

</section>

<section class="card">

    <h3>Recent Activity</h3>

    <p>Invitation created successfully.</p>

    <p>Waiting to be published.</p>

</section>

`;

}

window.openInvitation = openInvitation;
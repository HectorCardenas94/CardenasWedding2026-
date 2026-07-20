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

        <h2>${family ? family.name : "Invitation"}</h2>

        <p class="subtitle">

            Invitation Workspace

        </p>

    </div>

</header>

<section class="card">

    <h3>Invitation Overview</h3>

    <div class="workspace-grid">

        <div class="workspace-stat">

            <span class="workspace-label">

                Status

            </span>

            <strong>${invitation.status}</strong>

        </div>

        <div class="workspace-stat">

            <span class="workspace-label">

                Guests

            </span>

            <strong>${family ? family.guests : 0}</strong>

        </div>

        <div class="workspace-stat">

            <span class="workspace-label">

                Phone

            </span>

            <strong>${family ? family.phone : "-"}</strong>

        </div>

        <div class="workspace-stat">

            <span class="workspace-label">

                Website

            </span>

            <strong>Not Published</strong>

        </div>

    </div>

</section>

<section class="card">

    <h3>Quick Actions</h3>

    <p class="subtitle">

        Everything for this invitation starts here.

    </p>

    <div class="workspace-actions">

        <button
            class="primary-btn"
            onclick="showToast('Guest Manager Coming Soon')">

            👥 Guests

        </button>

        <button
            class="primary-btn"
            onclick="showToast('RSVP Manager Coming Soon')">

            💌 RSVP

        </button>

        <button
            class="primary-btn"
            onclick="showToast('Website Builder Coming Soon')">

            🌐 Website

        </button>

        <button
            class="primary-btn"
            onclick="showToast('Templates Coming Soon')">

            🎨 Templates

        </button>

        <button
            class="primary-btn"
            onclick="showToast('QR Code Coming Soon')">

            📱 QR Code

        </button>

        <button
            class="primary-btn"
            onclick="showToast('Preview Coming Soon')">

            👁 Preview

        </button>

    </div>

</section>

<section class="card">

    <h3>Activity</h3>

    <p>

        Invitation created successfully.

    </p>

    <p>

        Waiting to be published.

    </p>

</section>

`;

}

window.openInvitation = openInvitation;
"use strict";

/* ==========================================================
   NEXO Alpha 0.3
   Invitations Module
========================================================== */

const INVITATION_STORAGE_KEY = "nexo_invitations";

function getInvitations(){

    const data = localStorage.getItem(INVITATION_STORAGE_KEY);

    if(!data){

        return [];

    }

    try{

        return JSON.parse(data);

    }catch{

        return [];

    }

}

function saveInvitations(invitations){

    localStorage.setItem(

        INVITATION_STORAGE_KEY,

        JSON.stringify(invitations)

    );

}

function loadInvitations(){

    const page = document.getElementById("pageContainer");

    page.innerHTML = `

<header class="top-header">

<div>

<h2>Invitations</h2>

<p class="subtitle">

Create and manage invitations.

</p>

</div>

<button
class="primary-btn"
onclick="openCreateInvitationModal()">

＋ Create Invitation

</button>

</header>

<section id="invitationList">

</section>

`;

    renderInvitationCards();

}

/* ==========================================================
   Invitations UI - Part 1A
========================================================== */

function renderInvitationCards() {

    const invitations = getInvitations();
    const families = JSON.parse(localStorage.getItem("nexo_families") || "[]");

    const container = document.getElementById("invitationList");

    if (!container) return;

    if (invitations.length === 0) {

        container.innerHTML = `
            <section class="card">
                <h3>No Invitations Yet</h3>
                <p>Create your first invitation.</p>
            </section>
        `;

        return;

    }

    container.innerHTML = invitations.map(inv => {

        const family = families.find(f => f.id === inv.familyId);

        const guestCount = family?.guests?.length || 0;

        return `
            <section class="card invitation-card">

                <h3>${family ? family.name : "Unknown Family"}</h3>

                <p><strong>Guests:</strong> ${guestCount}</p>

                <p>
                    <strong>Status:</strong>
                    <span class="status-badge draft">
                        ${inv.status}
                    </span>
                </p>

                <div class="button-row">

                    <button
                        class="secondary-btn"
                        onclick="showToast('Coming Soon')">
                        Open
                    </button>

                    <button
                        class="secondary-btn"
                        onclick="showToast('Edit Coming Soon')">
                        Edit
                    </button>

                    <button
                        class="danger-btn"
                        onclick="deleteInvitation('${inv.id}')">
                        Delete
                    </button>

                </div>

            </section>
        `;

    }).join("");

}

function openCreateInvitationModal() {

    const families = JSON.parse(localStorage.getItem("nexo_families") || "[]");

    if (families.length === 0) {

        showToast("Create a family first.");

        return;

    }

    openModal(`

        <h2>Create Invitation</h2>

        <label>Family</label>

        <select id="inviteFamily">

            ${families.map(f => `
                <option value="${f.id}">
                    ${f.name}
                </option>
            `).join("")}

        </select>

        <br><br>

        <button
            class="primary-btn"
            onclick="createInvitation()">

            Create Invitation

        </button>

    `);

}

/* ==========================================================
   Invitations Logic - Part 1B
========================================================== */

function createInvitation() {

    alert("Create button works");

const familyId = document.getElementById("inviteFamily").value;

    const invitations = getInvitations();

    // Prevent duplicate invitations
    if (invitations.some(inv => inv.familyId === familyId)) {

        showToast("This family already has an invitation.");

        return;

    }

    invitations.push({

        id: crypto.randomUUID(),

        familyId,

        status: "Draft",

        createdAt: new Date().toISOString()

    });

    saveInvitations(invitations);

    closeModal();

    renderInvitationCards();

    showToast("Invitation created.");

}

function deleteInvitation(id) {

    if (!confirm("Delete this invitation?")) {

        return;

    }

    const invitations = getInvitations().filter(inv => inv.id !== id);

    saveInvitations(invitations);

    renderInvitationCards();

    showToast("Invitation deleted.");

}
window.createInvitation = createInvitation;
window.deleteInvitation = deleteInvitation;
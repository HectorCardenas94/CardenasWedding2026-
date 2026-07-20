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
onclick="showToast('Invitations Part 2 Coming Next')">

＋ Create Invitation

</button>

</header>

<section class="card">

<h3>No Invitations Yet</h3>

<p>

Your invitations will appear here.

</p>

</section>

`;

}
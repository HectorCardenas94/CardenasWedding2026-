let families = [];

fetch("guests.json")
    .then(response => response.json())
    .then(data => {
        families = data;
    });
function setStep(step){

const steps=document.querySelectorAll(".step");

steps.forEach((s,index)=>{

if(index<step){

s.classList.add("active");

}else{

s.classList.remove("active");

}

});

}
function findGuest() {

    const search = document
        .getElementById("guestSearch")
        .value
        .trim()
        .toLowerCase();

    const family = families.find(f => f.search === search);

    if (!family) {
        alert("Sorry, we couldn't find your invitation.");
        return;
    }

    showFamily(family);

}

function showFamily(family) {

    let html = `
        <h2>Welcome, ${family.family}</h2>

        <p style="margin-bottom:30px;">
            Please select everyone attending.
        </p>
    `;

    family.guests.forEach(person => {

html += `

<label class="guest-card">

<input type="checkbox">

<div>

<div class="guest-name">

${person}

</div>

<div class="guest-status">

Will be celebrating with us

</div>

</div>

</label>

`;

});

    html += `

        <textarea placeholder="Leave Hector & Laura a message..."></textarea>

        <button onclick="thankYou()">

            Submit RSVP

        </button>

    `;

    document.querySelector(".container").innerHTML = html;

}

function thankYou() {

document.querySelector(".container").innerHTML = `

<h1>Thank You ❤️</h1>

<p style="margin-top:30px;line-height:2;">

We can't wait to celebrate with you.

<br><br>

Love,

<br>

Hector & Laura

</p>

`;

}
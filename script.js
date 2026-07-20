import { saveRSVP } from "./firebase.js";

let families = [];

// Load guest list
fetch("guests.json")
  .then(response => response.json())
  .then(data => {
    families = data;
  });

// Progress bar
function setStep(step) {
  const steps = document.querySelectorAll(".step");

  steps.forEach((s, index) => {
    if (index < step) {
      s.classList.add("active");
    } else {
      s.classList.remove("active");
    }
  });
}

// Find guest
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

  setStep(2);
  showFamily(family);

}

// Show family members
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

    <button onclick="submitRSVP()">
      Submit RSVP
    </button>

  `;

  document.querySelector(".container").innerHTML = html;

}

// Save RSVP to Firebase
async function submitRSVP() {

  const guestCards = document.querySelectorAll(".guest-card");

  const attending = [];

  guestCards.forEach(card => {

    const checkbox = card.querySelector("input");
    const name = card.querySelector(".guest-name").textContent;

    if (checkbox.checked) {
      attending.push(name);
    }

  });

  const message = document.querySelector("textarea").value;

  try {

    await saveRSVP({
      family: document.querySelector("h2").textContent,
      attending: attending,
      message: message
    });

    thankYou();

  } catch (error) {

    console.error(error);
    alert("There was a problem saving your RSVP.");

  }

}

// Thank you page
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

// Make functions available to HTML
window.findGuest = findGuest;
window.submitRSVP = submitRSVP;
window.thankYou = thankYou;
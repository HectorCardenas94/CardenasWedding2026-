const workspace = document.getElementById("workspace");

function showDashboard() {

workspace.innerHTML = `

<h2>Dashboard</h2>

<p>Welcome back to NEXO.</p>

<br>

<div class="cards">

<div class="card">

<h3>Guests</h3>

<p>0</p>

</div>

<div class="card">

<h3>RSVPs</h3>

<p>0</p>

</div>

<div class="card">

<h3>Messages</h3>

<p>0</p>

</div>

</div>

`;

}
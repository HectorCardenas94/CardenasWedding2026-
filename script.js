const families = {
    carlos: {
        family: "Carlos Family",
        guests: [
            "Carlos",
            "Yoli",
            "Michael",
            "Ash",
            "Ash's Guest"
        ]
    },

    miguel: {
        family: "Miguel & Mariela Family",
        guests: [
            "Miguel",
            "Mariela"
        ]
    },

    hermo: {
        family: "Hermo Family",
        guests: [
            "Hermo",
            "Lupita",
            "Izzy",
            "Emm"
        ]
    }
};

function findGuest(){

    const input = document
        .getElementById("guestSearch")
        .value
        .trim()
        .toLowerCase();

    if(!families[input]){
        alert("Sorry, we couldn't find your invitation.");
        return;
    }

    showFamily(families[input]);
}

function showFamily(data){

    let html = `
        <h2>${data.family}</h2>
        <p style="margin-bottom:25px;">
            Please select everyone who will be attending.
        </p>
    `;

    data.guests.forEach(name=>{

        html += `
            <label class="guest-card">
                <input type="checkbox">
                ${name}
            </label>
        `;

    });

    html += `

        <textarea
        placeholder="Leave a message for Hector & Laura (optional)"></textarea>

        <button onclick="thankYou()">
            Submit RSVP
        </button>

    `;

    document.querySelector(".container").innerHTML = html;

}

function thankYou(){

document.querySelector(".container").innerHTML=`

<h1>Thank You ❤️</h1>

<p style="margin-top:25px;line-height:2;">

We can't wait to celebrate with you.

<br><br>

Love,

<br>

Hector & Laura

</p>

`;

}

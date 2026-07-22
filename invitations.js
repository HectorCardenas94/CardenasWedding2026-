const invitationsModule = (() => {

    const STORAGE_KEY = "nexo_invitations";

    let data = {
        invitations: [],
        activity: []
    };

    function init() {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            data = JSON.parse(saved);
        }

        syncFamilies();

        save();

    }

    function save() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

    }

    function syncFamilies() {

        let families = [];

        try {

            const savedFamilies =
                localStorage.getItem("nexo_families");

            if (savedFamilies) {

                const parsed = JSON.parse(savedFamilies);

                families = parsed.families || [];

            }

        } catch (err) {

            console.error(err);

        }

        families.forEach(family => {

            const exists =
                data.invitations.find(
                    x => x.familyId === family.id
                );

            if (!exists) {

                data.invitations.push({

                    id: crypto.randomUUID(),

                    familyId: family.id,

                    familyName: family.name,

                    invitationStatus: "Not Sent",

                    emailStatus: "Not Sent",

                    smsStatus: "Not Sent",

                    qrStatus: "Not Generated",

                    rsvpStatus: "Pending",

                    email: family.email || "",

                    phone: family.phone || "",

                    guests: family.guests || [],

                    qrCode: "",

                    rsvpLink: ""

                });

            }

        });

    }

    function render() {

        return `

<div class="page-header">

<h1>Invitations</h1>

<p>
Manage invitations, email, SMS,
QR Codes and RSVP tracking.
</p>

</div>

${renderOverview()}

${renderInvitationList()}

${renderActivity()}

`;

    }

    function renderOverview() {

        const total = data.invitations.length;

        const sent =
            data.invitations.filter(
                x => x.invitationStatus === "Sent"
            ).length;

        const pending =
            data.invitations.filter(
                x => x.rsvpStatus === "Pending"
            ).length;

        const received =
            data.invitations.filter(
                x => x.rsvpStatus === "Received"
            ).length;

        return `

<div class="card">

<h2>Invitation Overview</h2>

<div class="stats-grid">

<div class="stat-card">
<h3>${total}</h3>
<p>Total Families</p>
</div>

<div class="stat-card">
<h3>${sent}</h3>
<p>Invitations Sent</p>
</div>

<div class="stat-card">
<h3>${pending}</h3>
<p>Pending RSVP</p>
</div>

<div class="stat-card">
<h3>${received}</h3>
<p>RSVP Received</p>
</div>

</div>

</div>

`;

    }

    function renderInvitationList() {

        let html = `

<div class="card">

<h2>Invitation List</h2>

`;

        data.invitations.forEach(invite => {

            html += `

<div class="family-row">

<div>

<strong>${invite.familyName}</strong>

<br>

Invitation:
${invite.invitationStatus}

<br>

RSVP:
${invite.rsvpStatus}

</div>

<div>

<button>

Manage

</button>

</div>

</div>

`;

        });

        html += `

</div>

`;

        return html;

    }

    function renderActivity() {

        let html = `

<div class="card">

<h2>Recent Activity</h2>

`;

        if (data.activity.length === 0) {

            html += `
<p>No activity yet.</p>
`;

        }

        data.activity
            .slice()
            .reverse()
            .forEach(item => {

                html += `

<p>

${item}

</p>

`;

            });

        html += `

</div>

`;

        return html;

    }

    return {

        init,

        render,

        save

    };

})();


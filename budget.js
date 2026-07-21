/* ==========================================
   NEXO Budget Module
   Version: 1.0
========================================== */

const budgetModule = {
    
    data: {

    availableFunds: 0,

    budgetGoal: 0,

    totalSpent: 0,

    categories: []

},
    initialized: false,

    init() {

    if (this.initialized) return;

    const savedData = localStorage.getItem("nexo-finances");

    if (savedData) {

        this.data = JSON.parse(savedData);

    }

    this.initialized = true;

},

save() {

    localStorage.setItem(

        "nexo-finances",

        JSON.stringify(this.data)

    );

},



    render() {

    return `
    <section class="page-section budget-page">

        <div class="page-header">

            <h2>💰 Wedding Finances</h2>

            <p>Manage your wedding finances in one place.</p>

        </div>

        ${this.renderOverview()}

        ${this.renderUpcomingPayments()}

        ${this.renderRecentActivity()}

        ${this.renderCategories()}

    </section>
    `;

},

renderOverview() {

    return `

        <section class="budget-overview">

            <h3>Financial Overview</h3>

            <div class="budget-summary">

                <div class="summary-card">

                    <h4>💵 Available Funds</h4>

                    <span>$${this.data.availableFunds.toLocaleString()}</span>

                </div>

                <div class="summary-card">

                    <h4>🎯 Budget Goal</h4>

                    <span>$${this.data.budgetGoal.toLocaleString()}</span>

                </div>

                <div class="summary-card">

                    <h4>💸 Total Spent</h4>

                    <span>$${this.data.totalSpent.toLocaleString()}</span>

                </div>

                <div class="summary-card">

                    <h4>💳 Remaining Budget</h4>

                    <span>$${(this.data.budgetGoal - this.data.totalSpent).toLocaleString()}</span>

                </div>

            </div>

            <div class="budget-actions">

                <button onclick="budgetModule.openFundsModal()">

                    💰 Manage Funds

                </button>

            </div>

        </section>

    `;

},

renderUpcomingPayments() {

    return `

        <section class="budget-section">

            <h3>⚠️ Upcoming Payments</h3>

            <p>No upcoming payments.</p>

        </section>

    `;

},

renderRecentActivity() {

    return `

        <section class="budget-section">

            <h3>🕒 Recent Activity</h3>

            <p>No recent activity.</p>

        </section>

    `;

},

renderCategories() {

    let html = "";

    if (this.data.categories.length === 0) {

        html = `
            <p>No categories yet.</p>
        `;

    } else {

        this.data.categories.forEach((category,index)=>{

            html += `

                <div class="category-card">

                    <h4>${category.name}</h4>

                    <p>Budget: $${category.budget.toLocaleString()}</p>

                    <p>Spent: $${category.spent.toLocaleString()}</p>

                    <p>Remaining: $${(category.budget-category.spent).toLocaleString()}</p>

                    <button onclick="budgetModule.deleteCategory(${index})">

                        Delete

                    </button>

                </div>

            `;

        });

    }

    return `

        <section class="budget-section">

            <h3>📂 Categories</h3>

            ${html}

            <button onclick="budgetModule.addCategory()">

                ➕ Add Category

            </button>

        </section>

    `;

},

addCategory() {

    const name = prompt("Category Name");

    if (!name) return;

    const budget = Number(prompt("Category Budget",0));

    this.data.categories.push({

        name,

        budget,

        spent:0

    });

    this.save();

    document.getElementById("pageContainer").innerHTML =
        this.render();

},

deleteCategory(index) {

    if (!confirm("Delete this category?")) return;

    this.data.categories.splice(index,1);

    this.save();

    document.getElementById("pageContainer").innerHTML =
        this.render();

},



openFundsModal() {

    const available = prompt(
        "Enter Available Funds:",
        this.data.availableFunds
    );

    if (available === null) return;

    const goal = prompt(
        "Enter Budget Goal:",
        this.data.budgetGoal
    );

    if (goal === null) return;

    this.data.availableFunds = Number(available) || 0;
    this.data.budgetGoal = Number(goal) || 0;

    this.save();

    document.getElementById("pageContainer").innerHTML =
        this.render();

},


};
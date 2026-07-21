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

        this.initialized = true;

        console.log("✅ Budget Module Loaded");
    },

    render() {
    return `
    <section class="page-section budget-page">

        <div class="page-header">
            <h2>💰 Wedding Budget</h2>
            <p>Track every dollar of your wedding expenses.</p>
        </div>

        <div class="budget-summary">

            <div class="summary-card">
                <h3>💵 Available Funds</h3>
                <span>$${this.data.availableFunds.toLocaleString()}</span>
            </div>

            <div class="summary-card">
                <h3>🎯 Budget Goal</h3>
                <span>$${this.data.budgetGoal.toLocaleString()}</span>
            </div>

            <div class="summary-card">
                <h3>💸 Total Spent</h3>
                <span>$${this.data.totalSpent.toLocaleString()}</span>
            </div>

            <div class="summary-card">
                <h3>💳 Remaining Budget</h3>
                <span>$${(this.data.budgetGoal - this.data.totalSpent).toLocaleString()}</span>
            </div>

        </div>

        <div class="budget-actions">

            <button onclick="budgetModule.openFundsModal()">

                💰 Manage Funds

            </button>

        </div>

        <div id="budgetCategories"></div>

        <div id="budgetTransactions"></div>

    </section>
    `;
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

    document.getElementById("pageContainer").innerHTML =
        this.render();

}
};
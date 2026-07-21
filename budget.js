/* ==========================================
   NEXO Budget Module
   Version: 1.0
========================================== */

const budgetModule = {
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
                    <h3>Total Budget</h3>
                    <span>$0</span>
                </div>

                <div class="summary-card">
                    <h3>Spent</h3>
                    <span>$0</span>
                </div>

                <div class="summary-card">
                    <h3>Remaining</h3>
                    <span>$0</span>
                </div>

                <div class="summary-card">
                    <h3>Bills Due</h3>
                    <span>0</span>
                </div>

            </div>

            <div id="budgetCategories"></div>

            <div id="budgetTransactions"></div>

        </section>
        `;
    }
};
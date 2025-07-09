/**
 * APP.JS - Smart Budget Buddy Main Application
 * 
 * This is the main application controller that manages the entire frontend
 * interface. It handles navigation, form submissions, data display, and
 * user interactions. The app follows a single-page application (SPA) pattern
 * with section-based navigation.
 * 
 * @author Smart Budget Buddy Team
 * @version 1.0.0
 * 
 * Features:
 * - Section-based navigation (dashboard, expenses, budgets, AI insights)
 * - Form handling for expenses and budgets
 * - Real-time data updates
 * - AI integration for financial insights
 * - Budget progress tracking
 * - Error handling and user feedback
 * - Chart integration for data visualization
 * 
 * Dependencies:
 * - api.js (for backend communication)
 * - charts.js (for data visualization)
 * 
 * Usage:
 * The app is automatically initialized when the DOM loads. It creates
 * a global `window.app` instance that can be accessed from anywhere.
 */

/**
 * BudgetBuddyApp Class
 * 
 * Main application controller that manages the entire frontend interface.
 * Handles navigation, data loading, form processing, and user interactions.
 */
class BudgetBuddyApp {
    /**
     * Initialize the Budget Buddy application
     * Sets up initial state and triggers initialization
     */
    constructor() {
        /** @type {string} Current active section */
        this.currentSection = 'dashboard';

        /** @type {Array} Array of expense objects */
        this.expenses = [];

        /** @type {Array} Array of budget objects */
        this.budgets = [];

        /** @type {boolean} Loading state indicator */
        this.isLoading = false;

        // Start initialization
        this.init();
    }

    /**
     * Initialize the application and load initial data
     * This sets up the event listeners and loads initial data
     */
    async init() {
        this.setupEventListeners();
        await this.loadInitialData();
        this.showSection('dashboard');
    }

    /**
     * Set up all event listeners for the application
     * Handles navigation, form submissions, and user interactions
     */
    setupEventListeners() {
        // =============================================================================
        // NAVIGATION EVENT LISTENERS
        // =============================================================================

        // Handle navigation between sections
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.showSection(section);
            });
        });

        // =============================================================================
        // FORM EVENT LISTENERS
        // =============================================================================

        // Handle expense form submission
        document.getElementById('expense-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleExpenseSubmit();
        });

        // Handle budget form submission
        document.getElementById('budget-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBudgetSubmit();
        });

        // Handle AI question form submission
        document.getElementById('ai-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAISubmit();
        });
    }

    /**
     * Navigate to a specific section of the application
     * Updates navigation state and loads section-specific data
     * 
     * @param {string} sectionName - Name of the section to show ('dashboard', 'expenses', 'budgets', 'ai')
     */
    showSection(sectionName) {
        // Update navigation active state
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update section visibility
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        // Update current section state
        this.currentSection = sectionName;

        // Load section-specific data
        if (sectionName === 'dashboard') {
            this.updateDashboard();
        } else if (sectionName === 'expenses') {
            this.loadExpenses();
        } else if (sectionName === 'budgets') {
            this.loadBudgets();
        }
    }

    /**
     * Load initial data when the application starts
     * Fetches expenses and budgets from the backend
     */
    async loadInitialData() {

        try {

            this.setLoading(true);

            // Load expenses and budgets in parallel for better performance
            const [expensesResponse, budgetsResponse] = await Promise.all([
                api.getExpenses(),
                api.getBudgets()
            ]);

            // Store data in application state
            this.expenses = expensesResponse.expenses || [];
            this.budgets = budgetsResponse.budgets || [];

        } catch (error) {

            console.error('Failed to load initial data:', error);
            this.showError('Failed to load data. Please refresh the page.');
        } 
        
        finally {
            this.setLoading(false);
        }
    }

    /**
     * Update the dashboard with current financial data
     * Refreshes summary cards and spending chart
     */
    async updateDashboard() {
        try {
            // Get monthly report data from backend
            const report = await api.getMonthlyReport();

            // Update dashboard summary cards
            document.getElementById('total-spent').textContent =
                `$${report.total_spent.toFixed(2)}`;
            document.getElementById('expense-count').textContent =
                report.expense_count;
            document.getElementById('budget-count').textContent =
                this.budgets.length;

            // Update spending chart
            if (report.category_breakdown && Object.keys(report.category_breakdown).length > 0) {
                chartManager.createSpendingChart('spending-chart', report.category_breakdown);
            } else {
                // Show empty state when no data is available
                const canvas = document.getElementById('spending-chart');
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#7f8c8d';
                ctx.fillText('No spending data available', canvas.width / 2, canvas.height / 2);
            }

        } catch (error) {
            console.error('Failed to update dashboard:', error);
        }
    }

    // =============================================================================
    // FORM HANDLERS
    // =============================================================================

    /**
     * Handle expense form submission
     * Validates input, creates expense via API, and updates UI
     */
    async handleExpenseSubmit() {
        try {
            const form = document.getElementById('expense-form');
            const formData = new FormData(form);

            // Extract form data
            const expenseData = {
                amount: parseFloat(formData.get('amount') || document.getElementById('expense-amount').value),
                category: formData.get('category') || document.getElementById('expense-category').value,
                description: formData.get('description') || document.getElementById('expense-description').value,
                date: new Date().toISOString()
            };

            // Client-side validation
            if (!expenseData.amount || expenseData.amount <= 0) {
                throw new Error('Please enter a valid amount');
            }
            if (!expenseData.category) {
                throw new Error('Please select a category');
            }

            // Create expense via API
            this.setLoading(true);
            const response = await api.createExpense(expenseData);

            // Update local state and UI
            this.expenses.push(response.expense);
            this.showSuccess('Expense added successfully!');
            form.reset();
            this.loadExpenses();

            // Update dashboard if currently viewing it
            if (this.currentSection === 'dashboard') {
                this.updateDashboard();
            }

        } catch (error) {
            console.error('Failed to create expense:', error);
            this.showError(error.message || 'Failed to add expense');
        } finally {
            this.setLoading(false);
        }
    }

    /**
     * Handle budget form submission
     * Validates input, creates budget via API, and updates UI
     */
    async handleBudgetSubmit() {
        try {
            const form = document.getElementById('budget-form');
            const formData = new FormData(form);

            const budgetData = {
                category: formData.get('category') || document.getElementById('budget-category').value,
                amount: parseFloat(formData.get('amount') || document.getElementById('budget-amount').value),
                period: formData.get('period') || document.getElementById('budget-period').value
            };

            // Validate data
            if (!budgetData.category) {
                throw new Error('Please select a category');
            }
            if (!budgetData.amount || budgetData.amount <= 0) {
                throw new Error('Please enter a valid amount');
            }

            this.setLoading(true);
            const response = await api.createBudget(budgetData);

            this.budgets.push(response.budget);
            this.showSuccess('Budget created successfully!');
            form.reset();
            this.loadBudgets();

        } catch (error) {
            console.error('Failed to create budget:', error);
            this.showError(error.message || 'Failed to create budget');
        } finally {
            this.setLoading(false);
        }
    }

    async handleAISubmit() {
        try {
            const question = document.getElementById('ai-question').value.trim();

            if (!question) {
                throw new Error('Please enter a question');
            }

            this.setLoading(true);
            const container = document.getElementById('ai-insights-container');
            container.innerHTML = '<div class="loading">Getting AI insights...</div>';

            const response = await api.getAIInsights(this.expenses, question);

            this.displayAIInsights(response);
            document.getElementById('ai-question').value = '';

        } catch (error) {
            console.error('Failed to get AI insights:', error);
            this.showError('Failed to get AI insights. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }

    displayAIInsights(insights) {
        const container = document.getElementById('ai-insights-container');

        let html = `
            <div class="ai-insight">
                <p>${insights.insight}</p>
            </div>
        `;

        if (insights.recommendations && insights.recommendations.length > 0) {
            html += `
                <div class="ai-recommendations">
                    <h4>Recommendations:</h4>
                    <ul>
                        ${insights.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    loadExpenses() {

        const container = document.getElementById('expenses-container');

        if (this.expenses.length === 0) {

            container.innerHTML = '<div class="placeholder">No expenses yet. Add your first expense!</div>';
            return;
        }

        const html = this.expenses.map(expense => `
            <div class="expense-item">
                <div class="expense-info">
                    <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                    <div class="expense-category">${this.formatCategory(expense.category)}</div>
                    <div class="expense-description">${expense.description}</div>
                    <div class="expense-date">${this.formatDate(expense.date)}</div>
                </div>
                <button class="btn btn-danger" onclick="app.deleteExpense(${expense.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    loadBudgets() {
        const container = document.getElementById('budgets-container');

        if (this.budgets.length === 0) {
            container.innerHTML = '<div class="placeholder">No budgets yet. Create your first budget!</div>';
            return;
        }

        const html = this.budgets.map(budget => {
            const spent = this.calculateSpentForCategory(budget.category);
            const percentage = (spent / budget.amount) * 100;
            const isOverBudget = percentage > 100;

            return `
                <div class="budget-item">
                    <div class="budget-info">
                        <div class="budget-amount">$${budget.amount.toFixed(2)} ${budget.period}</div>
                        <div class="budget-category">${this.formatCategory(budget.category)}</div>
                        <div class="budget-progress">
                            <div class="progress-bar">
                                <div class="progress-fill ${isOverBudget ? 'over-budget' : ''}" 
                                     style="width: ${Math.min(percentage, 100)}%"></div>
                            </div>
                            <small>Spent: $${spent.toFixed(2)} (${percentage.toFixed(1)}%)</small>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }

    async deleteExpense(expenseId) {
        if (!confirm('Are you sure you want to delete this expense?')) {
            return;
        }

        try {
            this.setLoading(true);
            await api.deleteExpense(expenseId);

            this.expenses = this.expenses.filter(e => e.id !== expenseId);
            this.showSuccess('Expense deleted successfully!');
            this.loadExpenses();

            // Update dashboard if it's the current section
            if (this.currentSection === 'dashboard') {
                this.updateDashboard();
            }

        } catch (error) {
            console.error('Failed to delete expense:', error);
            this.showError('Failed to delete expense');
        } finally {
            this.setLoading(false);
        }
    }

    async resetTestData() {
        try {
            this.setLoading(true);
            const response = await api.resetTestData();

            // Reload all data
            await this.loadInitialData();

            this.showSuccess(`Test data reset! ${response.expenses_count} expenses and ${response.budgets_count} budgets loaded.`);

            // Update current view
            if (this.currentSection === 'dashboard') {
                this.updateDashboard();
            } else if (this.currentSection === 'expenses') {
                this.loadExpenses();
            } else if (this.currentSection === 'budgets') {
                this.loadBudgets();
            }

        } catch (error) {
            console.error('Failed to reset test data:', error);
            this.showError('Failed to reset test data');
        } finally {
            this.setLoading(false);
        }
    }

    calculateSpentForCategory(category) {
        return this.expenses
            .filter(expense => expense.category === category)
            .reduce((total, expense) => total + expense.amount, 0);
    }

    formatCategory(category) {
        return category.charAt(0).toUpperCase() + category.slice(1).replace(/[_-]/g, ' ');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    setLoading(loading) {
        this.isLoading = loading;
        // You can add loading indicators here
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        // Remove existing messages
        document.querySelectorAll('.message').forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Add to page
        document.body.appendChild(messageDiv);

        // Remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    fillAIQuestion(question) {
        const textarea = document.getElementById('ai-question');
        textarea.value = question;
        textarea.focus();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BudgetBuddyApp();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BudgetBuddyApp };
}

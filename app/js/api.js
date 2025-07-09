/**
 * API.JS - Smart Budget Buddy API Client
 * 
 * This module provides a comprehensive API client for communicating with the
 * Smart Budget Buddy backend. It handles all HTTP requests, error handling,
 * and provides a clean interface for frontend components to interact with
 * the FastAPI backend.
 * 
 * @author Smart Budget Buddy Team
 * @version 1.0.0
 * 
 * Features:
 * - Centralized API configuration
 * - Error handling and logging
 * - Promise-based async methods
 * - CORS-compatible requests
 * - JSON serialization/deserialization
 * 
 * Usage:
 * ```javascript
 * // Get all expenses
 * const expenses = await api.getExpenses();
 * 
 * // Create a new expense
 * const expense = await api.createExpense({
 *     amount: 25.50,
 *     category: 'food',
 *     description: 'Coffee and pastry'
 * });
 * 
 * // Get AI insights
 * const insights = await api.getAIInsights(expenses, 'How can I save money?');
 * ```
 */

// API Configuration
const API_BASE_URL = 'http://localhost:8000';

/**
 * BudgetAPI Class
 * 
 * Main API client class that provides methods for communicating with the
 * Smart Budget Buddy backend. All methods return Promises and handle
 * error cases appropriately.
 */

class BudgetAPI {
    /**
     * Initialize the API client
     * @param {string} baseURL - Base URL for the API (default: http://localhost:8000)
     */
    constructor(baseURL = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    /**
     * Generic request method that handles all HTTP communication
     * 
     * @param {string} endpoint - API endpoint path (e.g., '/api/expenses')
     * @param {Object} options - Fetch options (method, headers, body, etc.)
     * @returns {Promise<Object>} - Parsed JSON response
     * @throws {Error} - HTTP or network errors
     */
    async request(endpoint, options = {}) {

        const url = `${this.baseURL}${endpoint}`;

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const config = {
            ...defaultOptions,
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // =============================================================================
    // EXPENSE METHODS
    // =============================================================================

    /**
     * Get all expenses from the backend
     * @returns {Promise<Object>} - Object containing expenses array
     * @example
     * const result = await api.getExpenses();
     * console.log(result.expenses); // Array of expense objects
     */
    async getExpenses() {
        return this.request('/api/expenses');
    }

    /**
     * Create a new expense
     * @param {Object} expenseData - Expense data object
     * @param {number} expenseData.amount - Expense amount
     * @param {string} expenseData.category - Expense category
     * @param {string} expenseData.description - Expense description
     * @param {string} [expenseData.date] - Expense date (optional, defaults to now)
     * @returns {Promise<Object>} - Created expense object
     * @example
     * 
     * const expense = await api.createExpense({
     *     amount: 25.50,
     *     category: 'food',
     *     description: 'Coffee and pastry'
     * });
     */
    async createExpense(expenseData) {
        return this.request('/api/expenses', {
            method: 'POST',
            body: JSON.stringify(expenseData),
        });
    }

    /**
     * Delete an expense by ID
     * @param {number} expenseId - ID of the expense to delete
     * @returns {Promise<Object>} - Success message
     * @example
     * await api.deleteExpense(123);
     */
    async deleteExpense(expenseId) {
        return this.request(`/api/expenses/${expenseId}`, {
            method: 'DELETE',
        });
    }

    // =============================================================================
    // BUDGET METHODS
    // =============================================================================

    /**
     * Get all budgets from the backend
     * @returns {Promise<Object>} - Object containing budgets array
     * @example
     * const result = await api.getBudgets();
     * console.log(result.budgets); // Array of budget objects
     */
    async getBudgets() {
        return this.request('/api/budgets');
    }

    /**
     * Create a new budget
     * @param {Object} budgetData - Budget data object
     * @param {string} budgetData.category - Budget category
     * @param {number} budgetData.amount - Budget amount
     * @param {string} [budgetData.period] - Budget period (default: 'monthly')
     * @returns {Promise<Object>} - Created budget object
     * @example
     * const budget = await api.createBudget({
     *     category: 'food',
     *     amount: 400.00,
     *     period: 'monthly'
     * });
     */
    async createBudget(budgetData) {
        return this.request('/api/budgets', {
            method: 'POST',
            body: JSON.stringify(budgetData),
        });
    }

    // =============================================================================
    // AI METHODS
    // =============================================================================

    /**
     * Get AI-powered financial insights
     * @param {Array} expenses - Array of expense objects
     * @param {string} question - Question to ask the AI
     * @returns {Promise<Object>} - AI insights object with recommendations
     * @example
     * const insights = await api.getAIInsights(expenses, 'How can I save money on food?');
     * console.log(insights.insight); // AI insight text
     * console.log(insights.recommendations); // Array of recommendations
     */
    async getAIInsights(expenses, question) {
        return this.request('/api/ai/insights', {
            method: 'POST',
            body: JSON.stringify({
                expenses: expenses,
                question: question
            }),
        });
    }

    // =============================================================================
    // REPORTS METHODS
    // =============================================================================

    /**
     * Get monthly spending report
     * @returns {Promise<Object>} - Monthly report with category breakdown
     * @example
     * const report = await api.getMonthlyReport();
     * console.log(report.total_spent); // Total amount spent
     * console.log(report.category_breakdown); // Spending by category
     */
    async getMonthlyReport() {
        return this.request('/api/reports/monthly');
    }

    // =============================================================================
    // UTILITY METHODS
    // =============================================================================

    /**
     * Check if the backend API is healthy
     * @returns {Promise<Object>} - Health status object
     * @example
     * const health = await api.healthCheck();
     * console.log(health.status); // 'healthy'
     */
    async healthCheck() {
        return this.request('/health');
    }

    /**
     * Get sample questions for the AI
     * @returns {Promise<Object>} - Object containing sample questions array
     * @example
     * const result = await api.getSampleQuestions();
     * console.log(result.questions); // Array of sample questions
     */
    async getSampleQuestions() {
        return this.request('/api/sample-questions');
    }

    /**
     * Reset the test data to initial state
     * @returns {Promise<Object>} - Success message with data counts
     * @example
     * const result = await api.resetTestData();
     * console.log(result.message); // 'Test data has been reset'
     */
    async resetTestData() {
        return this.request('/api/reset-data', {
            method: 'POST',
        });
    }
}

// =============================================================================
// GLOBAL API INSTANCE
// =============================================================================

/**
 * Global API instance for use throughout the application
 * @type {BudgetAPI}
 * @example
 * // Use the global api instance
 * const expenses = await api.getExpenses();
 */
const api = new BudgetAPI();

// =============================================================================
// MODULE EXPORTS
// =============================================================================

/**
 * Export for use in other files or Node.js environments
 * Provides both the class and the global instance
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BudgetAPI, api };
}

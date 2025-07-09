/**
 * CHARTS.JS - Smart Budget Buddy Chart Management
 * 
 * This module provides comprehensive chart functionality for the Smart Budget Buddy
 * application using Chart.js. It manages all data visualizations including spending
 * breakdowns, budget comparisons, and trend analysis.
 * 
 * @author Smart Budget Buddy Team
 * @version 1.0.0
 * 
 * Features:
 * - Doughnut charts for spending category breakdown
 * - Bar charts for budget vs actual spending comparison
 * - Line charts for monthly spending trends
 * - Responsive design and animations
 * - Custom tooltips and styling
 * - Chart lifecycle management (create, update, destroy)
 * 
 * Dependencies:
 * - Chart.js library (included via CDN in HTML)
 * 
 * Usage:
 * ```javascript
 * // Create a spending chart
 * chartManager.createSpendingChart('chart-canvas-id', {
 *     'food': 250.50,
 *     'transport': 100.00,
 *     'entertainment': 75.25
 * });
 * 
 * // Update chart data
 * chartManager.updateChart('chart-canvas-id', newData);
 * ```
 */

/**
 * ChartManager Class
 * 
 * Manages all chart creation, updates, and destruction for the application.
 * Provides a centralized way to handle Chart.js instances and styling.
 */
class ChartManager {
    /**
     * Initialize the Chart Manager
     * Sets up color scheme and chart storage
     */
    constructor() {
        /** @type {Object} Storage for Chart.js instances */
        this.charts = {};

        /** @type {Object} Application color scheme */
        this.colors = {
            primary: '#667eea',
            secondary: '#764ba2',
            success: '#27ae60',
            warning: '#f39c12',
            danger: '#e74c3c',
            info: '#3498db',
            light: '#ecf0f1',
            dark: '#2c3e50'
        };
    }

    // =============================================================================
    // CHART CREATION METHODS
    // =============================================================================

    /**
     * Create a doughnut chart showing spending breakdown by category
     * 
     * @param {string} canvasId - ID of the canvas element
     * @param {Object} data - Category spending data (e.g., {'food': 250, 'transport': 100})
     * @returns {Chart|null} - Chart.js instance or null if canvas not found
     * 
     * @example
     * chartManager.createSpendingChart('spending-chart', {
     *     'food': 250.50,
     *     'transport': 100.00,
     *     'entertainment': 75.25
     * });
     */
    createSpendingChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        // Destroy existing chart to prevent memory leaks
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        // Prepare chart data
        const chartData = {
            labels: Object.keys(data),
            datasets: [{
                label: 'Spending by Category',
                data: Object.values(data),
                backgroundColor: [
                    this.colors.primary,
                    this.colors.secondary,
                    this.colors.success,
                    this.colors.warning,
                    this.colors.danger,
                    this.colors.info,
                    this.colors.light
                ],
                borderColor: [
                    this.colors.primary,
                    this.colors.secondary,
                    this.colors.success,
                    this.colors.warning,
                    this.colors.danger,
                    this.colors.info,
                    this.colors.dark
                ],
                borderWidth: 2,
                hoverOffset: 4
            }]
        };

        // Chart configuration
        const config = {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Spending by Category',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 1000
                }
            }
        };

        // Create and store chart
        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    /**
     * Create a bar chart comparing budget vs actual spending
     * 
     * @param {string} canvasId - ID of the canvas element
     * @param {Array} budgets - Array of budget objects
     * @param {Array} expenses - Array of expense objects
     * @returns {Chart|null} - Chart.js instance or null if canvas not found
     * 
     * @example
     * chartManager.createBudgetChart('budget-chart', budgets, expenses);
     */
    createBudgetChart(canvasId, budgets, expenses) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        // Destroy existing chart to prevent memory leaks
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        // Calculate spent amounts by category
        const spentByCategory = {};
        expenses.forEach(expense => {
            const category = expense.category;
            spentByCategory[category] = (spentByCategory[category] || 0) + expense.amount;
        });

        // Prepare chart data
        const labels = budgets.map(budget => budget.category);
        const budgetAmounts = budgets.map(budget => budget.amount);
        const spentAmounts = budgets.map(budget => spentByCategory[budget.category] || 0);

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Budget',
                    data: budgetAmounts,
                    backgroundColor: this.colors.primary + '40',
                    borderColor: this.colors.primary,
                    borderWidth: 2
                },
                {
                    label: 'Spent',
                    data: spentAmounts,
                    backgroundColor: this.colors.danger + '40',
                    borderColor: this.colors.danger,
                    borderWidth: 2
                }
            ]
        };

        const config = {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Budget vs Actual Spending',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return '$' + value.toFixed(0);
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        };

        // Create and store chart
        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    /**
     * Create a line chart showing monthly spending trends
     * 
     * @param {string} canvasId - ID of the canvas element
     * @param {Object} monthlyData - Monthly data with labels and values
     * @param {Array} monthlyData.labels - Month labels (e.g., ['Jan', 'Feb', 'Mar'])
     * @param {Array} monthlyData.values - Spending values for each month
     * @returns {Chart|null} - Chart.js instance or null if canvas not found
     * 
     * @example
     * chartManager.createTrendChart('trend-chart', {
     *     labels: ['Jan', 'Feb', 'Mar'],
     *     values: [750, 820, 690]
     * });
     */
    createTrendChart(canvasId, monthlyData) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        // Destroy existing chart to prevent memory leaks
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        // Prepare chart data
        const chartData = {
            labels: monthlyData.labels,
            datasets: [{
                label: 'Monthly Spending',
                data: monthlyData.values,
                borderColor: this.colors.primary,
                backgroundColor: this.colors.primary + '20',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: this.colors.primary,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        };

        const config = {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Spending Trend',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `Spending: $${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return '$' + value.toFixed(0);
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        };

        // Create and store chart
        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    // =============================================================================
    // CHART MANAGEMENT METHODS
    // =============================================================================

    /**
     * Update an existing chart with new data
     * 
     * @param {string} canvasId - ID of the canvas element
     * @param {Object} newData - New data to update the chart with
     * 
     * @example
     * chartManager.updateChart('spending-chart', {
     *     'food': 300,
     *     'transport': 120
     * });
     */
    updateChart(canvasId, newData) {
        const chart = this.charts[canvasId];
        if (!chart) return;

        // Update doughnut chart data
        if (chart.config.type === 'doughnut') {
            chart.data.labels = Object.keys(newData);
            chart.data.datasets[0].data = Object.values(newData);
        }

        chart.update();
    }

    /**
     * Destroy a specific chart instance
     * 
     * @param {string} canvasId - ID of the canvas element
     * 
     * @example
     * chartManager.destroyChart('spending-chart');
     */
    destroyChart(canvasId) {
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
            delete this.charts[canvasId];
        }
    }

    /**
     * Destroy all chart instances
     * Useful for cleanup when navigating away from the page
     * 
     * @example
     * chartManager.destroyAllCharts();
     */
    destroyAllCharts() {
        Object.keys(this.charts).forEach(canvasId => {
            this.destroyChart(canvasId);
        });
    }
}

// =============================================================================
// GLOBAL CHART MANAGER INSTANCE
// =============================================================================

/**
 * Global chart manager instance for use throughout the application
 * @type {ChartManager}
 * 
 * @example
 * // Use the global chartManager instance
 * chartManager.createSpendingChart('chart-id', data);
 */
const chartManager = new ChartManager();

// =============================================================================
// MODULE EXPORTS
// =============================================================================

/**
 * Export for use in other files or Node.js environments
 * Provides both the class and the global instance
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChartManager, chartManager };
}

# Test Data for Smart Budget Buddy
# This file contains sample data to demonstrate the application's functionality

from datetime import datetime, timedelta
import random

# Sample expense categories with realistic data
SAMPLE_EXPENSES = [
    # Food & Dining
    {
        "id": 1,
        "amount": 45.67,
        "category": "food",
        "description": "Grocery shopping at Whole Foods",
        "date": (datetime.now() - timedelta(days=1)).isoformat()
    },
    {
        "id": 2,
        "amount": 18.50,
        "category": "food",
        "description": "Coffee and pastry",
        "date": (datetime.now() - timedelta(days=2)).isoformat()
    },
    {
        "id": 3,
        "amount": 32.80,
        "category": "food",
        "description": "Lunch at Italian restaurant",
        "date": (datetime.now() - timedelta(days=3)).isoformat()
    },
    {
        "id": 4,
        "amount": 12.99,
        "category": "food",
        "description": "Fast food dinner",
        "date": (datetime.now() - timedelta(days=4)).isoformat()
    },
    
    # Transportation
    {
        "id": 5,
        "amount": 3.50,
        "category": "transport",
        "description": "Metro subway ticket",
        "date": (datetime.now() - timedelta(days=1)).isoformat()
    },
    {
        "id": 6,
        "amount": 25.00,
        "category": "transport",
        "description": "Uber ride to airport",
        "date": (datetime.now() - timedelta(days=5)).isoformat()
    },
    {
        "id": 7,
        "amount": 60.00,
        "category": "transport",
        "description": "Gas for car",
        "date": (datetime.now() - timedelta(days=7)).isoformat()
    },
    
    # Entertainment
    {
        "id": 8,
        "amount": 15.00,
        "category": "entertainment",
        "description": "Movie ticket",
        "date": (datetime.now() - timedelta(days=2)).isoformat()
    },
    {
        "id": 9,
        "amount": 8.99,
        "category": "entertainment",
        "description": "Netflix subscription",
        "date": (datetime.now() - timedelta(days=10)).isoformat()
    },
    {
        "id": 10,
        "amount": 45.00,
        "category": "entertainment",
        "description": "Concert tickets",
        "date": (datetime.now() - timedelta(days=15)).isoformat()
    },
    
    # Shopping
    {
        "id": 11,
        "amount": 89.99,
        "category": "shopping",
        "description": "New running shoes",
        "date": (datetime.now() - timedelta(days=3)).isoformat()
    },
    {
        "id": 12,
        "amount": 24.50,
        "category": "shopping",
        "description": "Book purchase",
        "date": (datetime.now() - timedelta(days=6)).isoformat()
    },
    {
        "id": 13,
        "amount": 156.78,
        "category": "shopping",
        "description": "Clothing shopping",
        "date": (datetime.now() - timedelta(days=12)).isoformat()
    },
    
    # Utilities
    {
        "id": 14,
        "amount": 85.00,
        "category": "utilities",
        "description": "Electric bill",
        "date": (datetime.now() - timedelta(days=5)).isoformat()
    },
    {
        "id": 15,
        "amount": 45.00,
        "category": "utilities",
        "description": "Internet bill",
        "date": (datetime.now() - timedelta(days=8)).isoformat()
    },
    {
        "id": 16,
        "amount": 32.00,
        "category": "utilities",
        "description": "Water bill",
        "date": (datetime.now() - timedelta(days=10)).isoformat()
    },
    
    # Healthcare
    {
        "id": 17,
        "amount": 25.00,
        "category": "healthcare",
        "description": "Pharmacy prescription",
        "date": (datetime.now() - timedelta(days=4)).isoformat()
    },
    {
        "id": 18,
        "amount": 150.00,
        "category": "healthcare",
        "description": "Doctor visit copay",
        "date": (datetime.now() - timedelta(days=14)).isoformat()
    },
    
    # Other
    {
        "id": 19,
        "amount": 20.00,
        "category": "other",
        "description": "Bank ATM fee",
        "date": (datetime.now() - timedelta(days=7)).isoformat()
    },
    {
        "id": 20,
        "amount": 50.00,
        "category": "other",
        "description": "Gift for friend",
        "date": (datetime.now() - timedelta(days=11)).isoformat()
    }
]

# Sample budgets
SAMPLE_BUDGETS = [
    {
        "id": 1,
        "category": "food",
        "amount": 400.00,
        "period": "monthly"
    },
    {
        "id": 2,
        "category": "transport",
        "amount": 150.00,
        "period": "monthly"
    },
    {
        "id": 3,
        "category": "entertainment",
        "amount": 100.00,
        "period": "monthly"
    },
    {
        "id": 4,
        "category": "shopping",
        "amount": 200.00,
        "period": "monthly"
    },
    {
        "id": 5,
        "category": "utilities",
        "amount": 180.00,
        "period": "monthly"
    },
    {
        "id": 6,
        "category": "healthcare",
        "amount": 250.00,
        "period": "monthly"
    },
    {
        "id": 7,
        "category": "other",
        "amount": 100.00,
        "period": "monthly"
    }
]

# Financial tips for AI responses
SAMPLE_AI_INSIGHTS = {
    "spending_analysis": [
        "You're spending 15% more on food than the average person in your area. Consider meal planning to reduce costs.",
        "Your transportation costs are well within reasonable limits. Good job on using public transit!",
        "Entertainment expenses seem balanced. You're maintaining a healthy work-life balance.",
        "Shopping expenses have increased by 30% this month. Consider creating a shopping budget."
    ],
    "budget_recommendations": [
        "Based on your spending patterns, I recommend allocating 25% of your budget to food expenses.",
        "Your current transportation budget covers your needs well. No changes needed here.",
        "Consider reducing entertainment spending by 10% to increase your savings rate.",
        "You might want to set aside an emergency fund equal to 3-6 months of expenses."
    ],
    "savings_tips": [
        "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings and debt repayment.",
        "Consider using cashback credit cards for your regular purchases to earn rewards.",
        "Look for subscription services you're not using and cancel them to save money.",
        "Cook at home more often - it can save you $200-300 per month on food expenses."
    ]
}

def get_sample_expenses():
    """Return a copy of sample expenses"""
    return SAMPLE_EXPENSES.copy()

def get_sample_budgets():
    """Return a copy of sample budgets"""
    return SAMPLE_BUDGETS.copy()

def get_random_ai_insight(category="spending_analysis"):
    """Get a random AI insight from the specified category"""
    insights = SAMPLE_AI_INSIGHTS.get(category, SAMPLE_AI_INSIGHTS["spending_analysis"])
    return random.choice(insights)

def generate_monthly_data():
    """Generate sample monthly spending data for charts"""
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    values = [750, 820, 690, 950, 880, 720]  # Sample monthly totals
    return {
        "labels": months,
        "values": values
    }

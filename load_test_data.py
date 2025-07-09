#!/usr/bin/env python3
"""
Load Test Data Script
This script helps students understand how to work with the test data
"""

import json
from test_data import get_sample_expenses, get_sample_budgets, SAMPLE_AI_INSIGHTS

def print_test_data_summary():
    """Print a summary of the test data"""
    expenses = get_sample_expenses()
    budgets = get_sample_budgets()
    
    print("=" * 50)
    print("SMART BUDGET BUDDY - TEST DATA SUMMARY")
    print("=" * 50)
    
    print(f"\n📊 EXPENSES ({len(expenses)} items)")
    print("-" * 30)
    
    # Group expenses by category
    categories = {}
    total_spent = 0
    
    for expense in expenses:
        cat = expense["category"]
        amount = expense["amount"]
        categories[cat] = categories.get(cat, 0) + amount
        total_spent += amount
    
    for category, amount in sorted(categories.items()):
        print(f"{category.capitalize():12} ${amount:7.2f}")
    
    print(f"{'Total':12} ${total_spent:7.2f}")
    
    print(f"\n💰 BUDGETS ({len(budgets)} items)")
    print("-" * 30)
    
    total_budget = 0
    for budget in budgets:
        spent = categories.get(budget["category"], 0)
        percentage = (spent / budget["amount"]) * 100 if budget["amount"] > 0 else 0
        status = "🔴 OVER" if percentage > 100 else "🟡 CLOSE" if percentage > 80 else "🟢 GOOD"
        
        print(f"{budget['category'].capitalize():12} ${budget['amount']:7.2f} ({percentage:5.1f}%) {status}")
        total_budget += budget["amount"]
    
    print(f"{'Total':12} ${total_budget:7.2f}")
    
    print(f"\n🤖 AI INSIGHTS")
    print("-" * 30)
    for category, insights in SAMPLE_AI_INSIGHTS.items():
        print(f"{category.replace('_', ' ').title()}: {len(insights)} insights")
    
    print(f"\n💡 USAGE TIPS")
    print("-" * 30)
    print("• Start the FastAPI server: uvicorn main:app --reload")
    print("• Visit http://localhost:8000/docs for API documentation")
    print("• Use POST /api/reset-data to reload test data")
    print("• Try different AI questions to see varied responses")
    
    print("\n" + "=" * 50)

def export_test_data_json():
    """Export test data to JSON files for inspection"""
    expenses = get_sample_expenses()
    budgets = get_sample_budgets()
    
    # Export expenses
    with open("sample_expenses.json", "w") as f:
        json.dump(expenses, f, indent=2)
    
    # Export budgets
    with open("sample_budgets.json", "w") as f:
        json.dump(budgets, f, indent=2)
    
    print("✅ Test data exported to:")
    print("   - sample_expenses.json")
    print("   - sample_budgets.json")

if __name__ == "__main__":
    print_test_data_summary()
    
    # Ask if user wants to export JSON files
    export = input("\nWould you like to export test data as JSON files? (y/n): ").lower()
    if export == 'y':
        export_test_data_json()

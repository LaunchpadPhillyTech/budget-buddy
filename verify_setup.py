#!/usr/bin/env python3
"""
Verification script for Smart Budget Buddy
This script checks if the backend is running and test data is loaded correctly.
"""

import httpx
import json
from test_data import get_sample_expenses, get_sample_budgets

def check_backend_health():
    """Check if backend is running"""
    try:
        with httpx.Client() as client:
            response = client.get('http://localhost:8000/health')
            if response.status_code == 200:
                print("✅ Backend is running on http://localhost:8000")
                return True
            else:
                print(f"❌ Backend health check failed with status: {response.status_code}")
                return False
    except httpx.ConnectError:
        print("❌ Backend is not running. Please start with: npm run backend")
        return False

def check_test_data():
    """Check if test data is loaded"""
    try:
        with httpx.Client() as client:
            # Check expenses
            expenses_response = client.get('http://localhost:8000/api/expenses')
            if expenses_response.status_code == 200:
                expenses_data = expenses_response.json()
                expense_count = len(expenses_data.get('expenses', []))
                expected_expenses = len(get_sample_expenses())
                
                if expense_count == expected_expenses:
                    print(f"✅ Test expenses loaded: {expense_count}/{expected_expenses}")
                else:
                    print(f"⚠️  Expected {expected_expenses} expenses, found {expense_count}")
            
            # Check budgets
            budgets_response = client.get('http://localhost:8000/api/budgets')
            if budgets_response.status_code == 200:
                budgets_data = budgets_response.json()
                budget_count = len(budgets_data.get('budgets', []))
                expected_budgets = len(get_sample_budgets())
                
                if budget_count == expected_budgets:
                    print(f"✅ Test budgets loaded: {budget_count}/{expected_budgets}")
                else:
                    print(f"⚠️  Expected {expected_budgets} budgets, found {budget_count}")
            
            # Check sample questions
            questions_response = client.get('http://localhost:8000/api/sample-questions')
            if questions_response.status_code == 200:
                questions_data = questions_response.json()
                question_count = len(questions_data.get('questions', []))
                print(f"✅ Sample questions available: {question_count}")
            
            return True
            
    except httpx.ConnectError:
        print("❌ Could not connect to backend to check test data")
        return False

def check_frontend():
    """Check if frontend is accessible"""
    try:
        with httpx.Client() as client:
            response = client.get('http://localhost:3000')
            if response.status_code == 200:
                print("✅ Frontend is accessible on http://localhost:3000")
                return True
            else:
                print(f"❌ Frontend check failed with status: {response.status_code}")
                return False
    except httpx.ConnectError:
        print("❌ Frontend is not running. Please start with: npm run dev")
        return False

def main():
    """Main verification function"""
    print("🔍 Smart Budget Buddy Setup Verification")
    print("=" * 50)
    
    backend_ok = check_backend_health()
    
    if backend_ok:
        test_data_ok = check_test_data()
        frontend_ok = check_frontend()
        
        print("\n📊 Summary:")
        print("=" * 50)
        
        if backend_ok and test_data_ok and frontend_ok:
            print("🎉 All systems are working correctly!")
            print("🌐 Open your browser to: http://localhost:3000")
            print("📚 API documentation: http://localhost:8000/docs")
        else:
            print("⚠️  Some issues found. Please check the messages above.")
            print("\n🔧 Quick fixes:")
            print("- Backend not running? Run: npm run backend")
            print("- Frontend not running? Run: npm run dev")
            print("- Test data issues? Restart backend")
    else:
        print("\n🔧 Please start the backend first:")
        print("   npm run backend")

if __name__ == "__main__":
    main()

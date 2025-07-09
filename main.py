from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import openai
from datetime import datetime
from test_data import get_sample_expenses, get_sample_budgets, get_random_ai_insight

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Smart Budget Buddy API",
    description="An AI-powered personal finance management application",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://0.0.0.0:3000",
        "http://0.0.0.0:8080"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Add OPTIONS handler for CORS preflight requests
@app.options("/{full_path:path}")
async def options_handler(full_path: str):
    """Handle OPTIONS requests for CORS preflight"""
    return {"message": "OK"}

# Security
security = HTTPBearer()

# Initialize OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY")

# Pydantic models
class ExpenseCreate(BaseModel):
    amount: float
    category: str
    description: str
    date: Optional[str] = None

class BudgetCreate(BaseModel):
    category: str
    amount: float
    period: str = "monthly"

class AIInsightRequest(BaseModel):
    expenses: List[dict]
    question: str

# In-memory storage (for tutorial purposes - replace with database in production)
# Initialize with sample data for demonstration
expenses_db = get_sample_expenses()
budgets_db = get_sample_budgets()

@app.get("/")
async def root():
    return {"message": "Welcome to Smart Budget Buddy API!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Expense endpoints
@app.get("/api/expenses")
async def get_expenses():
    """Get all expenses"""
    return {"expenses": expenses_db}

@app.post("/api/expenses")
async def create_expense(expense: ExpenseCreate):
    
    """Create a new expense"""
    expense_dict = expense.dict()
    expense_dict["id"] .dict= len(expenses_db) + 1
    expense_dict["date"] = expense_dict["date"] or datetime.now().isoformat()
    expenses_db.append(expense_dict)
    return {"message": "Expense created", "expense": expense_dict}

@app.delete("/api/expenses/{expense_id}")
async def delete_expense(expense_id: int):
    """Delete an expense"""
    global expenses_db
    expenses_db = [e for e in expenses_db if e["id"] != expense_id]
    return {"message": "Expense deleted"}

# Budget endpoints
@app.get("/api/budgets")
async def get_budgets():
    """Get all budgets"""
    return {"budgets": budgets_db}

@app.post("/api/budgets")
async def create_budget(budget: BudgetCreate):
    """Create a new budget"""
    budget_dict = budget.dict()
    budget_dict["id"] = len(budgets_db) + 1
    budgets_db.append(budget_dict)
    return {"message": "Budget created", "budget": budget_dict}

# AI endpoints
@app.post("/api/ai/insights")
async def get_ai_insights(request: AIInsightRequest):
    """Get AI-powered financial insights"""
    try:
        # For demonstration purposes, we'll use sample insights
        # In production, you would call the OpenAI API here
        
        # Analyze the user's question to provide relevant insights
        question_lower = request.question.lower()
        
        if "save" in question_lower or "reduce" in question_lower:
            insight_type = "savings_tips"
        elif "budget" in question_lower or "recommend" in question_lower:
            insight_type = "budget_recommendations"
        else:
            insight_type = "spending_analysis"
        
        # Get a random insight from the appropriate category
        main_insight = get_random_ai_insight(insight_type)
        
        # Calculate some basic statistics from current expenses
        total_spent = sum(expense["amount"] for expense in request.expenses)
        categories = {}
        for expense in request.expenses:
            cat = expense["category"]
            categories[cat] = categories.get(cat, 0) + expense["amount"]
        
        # Find the highest spending category
        if categories:
            highest_category = max(categories, key=categories.get)
            highest_amount = categories[highest_category]
            
            # Add specific insights based on data
            if highest_amount > 200:
                main_insight += f" Your highest spending category is {highest_category} at ${highest_amount:.2f}."
        
        # Generate recommendations based on spending patterns
        recommendations = []
        
        if total_spent > 1000:
            recommendations.append("Consider setting up automatic savings to build an emergency fund")
        
        if categories.get("food", 0) > 300:
            recommendations.append("Try meal planning to reduce food expenses by 15-20%")
        
        if categories.get("entertainment", 0) > 150:
            recommendations.append("Look for free entertainment options like parks, libraries, or community events")
        
        if categories.get("shopping", 0) > 200:
            recommendations.append("Implement a 24-hour rule before making non-essential purchases")
        
        if not recommendations:
            recommendations = [
                "Great job managing your expenses!",
                "Consider automating your savings to reach your financial goals faster",
                "Track your spending weekly to stay on top of your budget"
            ]
        
        return {
            "insight": main_insight,
            "recommendations": recommendations[:3],  # Limit to 3 recommendations
            "summary": {
                "total_spent": total_spent,
                "top_category": max(categories, key=categories.get) if categories else "No expenses",
                "expense_count": len(request.expenses)
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@app.get("/api/reports/monthly")
async def get_monthly_report():
    """Get monthly spending report"""
    # Calculate totals by category
    category_totals = {}
    for expense in expenses_db:
        category = expense["category"]
        amount = expense["amount"]
        category_totals[category] = category_totals.get(category, 0) + amount
    
    total_spent = sum(category_totals.values())
    
    return {
        "total_spent": total_spent,
        "category_breakdown": category_totals,
        "expense_count": len(expenses_db)
    }

@app.post("/api/reset-data")
async def reset_test_data():
    """Reset the application to use sample test data"""
    global expenses_db, budgets_db
    expenses_db = get_sample_expenses()
    budgets_db = get_sample_budgets()
    return {
        "message": "Test data has been reset",
        "expenses_count": len(expenses_db),
        "budgets_count": len(budgets_db)
    }

@app.get("/api/sample-questions")
async def get_sample_questions():
    """Get sample questions students can ask the AI"""
    return {
        "questions": [
            "How can I reduce my spending on food?",
            "What's my biggest expense category?",
            "How much should I budget for entertainment?",
            "Give me tips to save money on transportation",
            "How can I improve my spending habits?",
            "What percentage of my budget should go to each category?",
            "How much am I spending compared to my budgets?",
            "What are some good money-saving strategies?"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

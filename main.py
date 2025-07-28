"""
Main entry point for the Budget Buddy application
"""

from backend.main import app

# This allows uvicorn to find the app when running from the root directory
backend = app 
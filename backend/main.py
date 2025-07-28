"""
Simple ChatGPT Integration Backend

This is a minimal FastAPI server that:
1. Receives text from the frontend
2. Sends it to ChatGPT
3. Returns the AI response

Only ~80 lines of actual code!
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Configure OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Create FastAPI app
app = FastAPI(
    title="Simple ChatGPT API",
    description="A minimal API that sends text to ChatGPT and returns responses",
    version="1.0.0"
)

# Enable CORS so frontend can call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000", 
        "http://[::1]:3000",  # IPv6 localhost
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://[::1]:3001"
    ],
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=True,
)

# ============================================================================
# DATA MODELS
# ============================================================================

class ChatRequest(BaseModel):
    """Model for incoming chat requests"""
    message: str
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "message": "Explain artificial intelligence in simple terms"
            }
        }
    }

class ChatResponse(BaseModel):
    """Model for chat responses"""
    response: str
    
# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Simple ChatGPT API is running!",
        "status": "healthy",
        "api_key_configured": bool(openai.api_key)
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_gpt(request: ChatRequest):
    """
    Send user message to ChatGPT and return the response
    
    This endpoint:
    1. Receives user text from frontend
    2. Sends it to OpenAI's ChatGPT API
    3. Returns the AI response
    4. Handles errors gracefully
    """
    try:
        # Log the incoming request
        logger.info(f"📥 Received message: {request.message[:50]}...")
        
        # Check if API key is configured
        if not client.api_key:
            logger.error("OpenAI API key not configured")
            raise HTTPException(
                status_code=500,
                detail="OpenAI API key not configured. Please add OPENAI_API_KEY to .env file"
            )
        
        # Prepare the ChatGPT request
        logger.info("🤖 Sending request to ChatGPT...")
        
        response = client.chat.completions.create(
            model="gpt-4.1-nano",  # Cost-effective model
            messages=[
                {
                    "role": "system", 
                    "content": "You are a helpful AI assistant. Provide clear, concise, and helpful responses."
                },
                {
                    "role": "user", 
                    "content": request.message
                }
            ],
            max_tokens=500,  # Limit response length
            temperature=0.7,  # Balanced creativity
        )
        
        # Extract the AI response
        ai_response = response.choices[0].message.content.strip()
        
        logger.info(f"✅ ChatGPT response received: {len(ai_response)} characters")
        
        # Return structured response
        return ChatResponse(response=ai_response)
        
    except Exception as e:
        logger.error(f"OpenAI API error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"ChatGPT service error: {str(e)}"
        )
        
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again."
        )

# ============================================================================
# SERVER STARTUP
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    
    print("🚀 Starting Simple ChatGPT API...")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🔗 Frontend should connect to: http://localhost:8000")
    
    if not os.getenv("OPENAI_API_KEY"):
        print("⚠️  WARNING: OPENAI_API_KEY not found in .env file!")
        print("   Create a .env file with your OpenAI API key")
    else:
        print("✅ OpenAI API key configured")
    
    # Start the server
    uvicorn.run(
        app,
        host="localhost",
        port=8000,
        reload=True,
        log_level="info"
    )
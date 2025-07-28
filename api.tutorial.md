# Complete Tutorial: Building 2 API Endpoints from Scratch
## From HTML Form to Working FastAPI Backend

### 🎯 Tutorial Goals
By the end of this tutorial, you will have built a complete full-stack application with:
- **HTML form** for user input
- **JavaScript fetch calls** to communicate with the backend
- **FastAPI endpoints** that handle GET and POST requests
- **Complete understanding** of how frontend and backend communicate

---

## 📋 Prerequisites and Required Tools

### **Required Software**
```bash
# Check if you have these installed:
python --version    # Should be 3.10 or higher
```

### **Tools You'll Need**
- **Python 3.10+** - For the FastAPI backend
- **Text Editor** - VS Code, Sublime Text, or any code editor
- **Web Browser** - Chrome, Firefox, or Safari (with Developer Tools)
- **Terminal/Command Prompt** - For running servers

### **Installation Commands**
```bash
# Install FastAPI and dependencies
pip install fastapi uvicorn pydantic

# Verify installation
python -c "import fastapi; print('FastAPI installed successfully!')"
```

---

## 📖 Understanding HTTP Requests

### **GET Request - Retrieving Data**
```
GET requests are used to RETRIEVE data from a server.
- No request body (data is sent via URL parameters if needed)
- Should not modify data on the server
- Can be cached by browsers
- Example: Loading a list of tasks
```

### **POST Request - Sending Data**
```
POST requests are used to SEND data to a server.
- Data is sent in the request body (usually JSON)
- Can create new resources or trigger server actions
- Not cached by browsers
- Example: Creating a new task
```

---

## 🏗️ Step 1: Create the HTML Foundation (15 minutes)

### **1.1 Create Project Structure**
```bash
# Create project directory
mkdir life-hack-tutorial
cd life-hack-tutorial

# Create subdirectories
mkdir frontend backend

# Create files
touch frontend/index.html
touch frontend/app.js
touch frontend/style.css
touch backend/main.py
```

### **1.2 Build the HTML Interface**
**File: `frontend/index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Life Hack Tutorial</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <header>
            <h1>🚀 Life Hack Tutorial</h1>
            <p>Learning Full-Stack Development</p>
        </header>

        <!-- Form Section for Creating Tasks -->
        <section class="form-section">
            <h2>Create New Task</h2>
            <form id="task-form">
                <!-- Task Title Input -->
                <div class="form-group">
                    <label for="task-title">Task Title:</label>
                    <input 
                        type="text" 
                        id="task-title" 
                        name="title" 
                        placeholder="Enter task title..." 
                        required
                    >
                </div>

                <!-- Task Description Input -->
                <div class="form-group">
                    <label for="task-description">Description:</label>
                    <textarea 
                        id="task-description" 
                        name="description" 
                        placeholder="Enter description (optional)..."
                        rows="3"
                    ></textarea>
                </div>

                <!-- Priority Selection -->
                <div class="form-group">
                    <label for="task-priority">Priority:</label>
                    <select id="task-priority" name="priority">
                        <option value="1">Low Priority</option>
                        <option value="2" selected>Medium Priority</option>
                        <option value="3">High Priority</option>
                    </select>
                </div>

                <!-- Submit Button -->
                <button type="submit" id="submit-btn">
                    Add Task
                </button>
            </form>
        </section>

        <!-- Display Section for Tasks -->
        <section class="tasks-section">
            <h2>My Tasks</h2>
            
            <!-- Status Message Area -->
            <div id="status-message" class="status-message"></div>
            
            <!-- Tasks Display Container -->
            <div id="tasks-container" class="tasks-container">
                <p class="loading">Click "Load Tasks" to fetch data from the server</p>
            </div>
            
            <!-- Load Tasks Button -->
            <button id="load-tasks-btn" class="secondary-btn">
                Load Tasks from Server
            </button>
        </section>
    </div>

    <!-- JavaScript File -->
    <script src="app.js"></script>
</body>
</html>
```

### **1.3 Add Basic Styling**
**File: `frontend/style.css`**
```css
/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

/* Header Styles */
header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

header h1 {
    color: #333;
    margin-bottom: 10px;
    font-size: 2.5em;
}

header p {
    color: #666;
    font-size: 1.1em;
}

/* Form Section Styles */
.form-section {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 30px;
    border: 1px solid #e9ecef;
}

.form-section h2 {
    color: #495057;
    margin-bottom: 20px;
    font-size: 1.5em;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #495057;
}

input, textarea, select {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Button Styles */
button {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
}

button:hover {
    background: #5a6fd8;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

button:active {
    transform: translateY(0);
}

button:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
}

.secondary-btn {
    background: #6c757d;
    margin-top: 20px;
}

.secondary-btn:hover {
    background: #5a6268;
}

/* Tasks Section */
.tasks-section {
    margin-top: 30px;
}

.tasks-section h2 {
    color: #495057;
    margin-bottom: 20px;
    font-size: 1.5em;
}

.tasks-container {
    min-height: 200px;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
}

.task-item {
    background: white;
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
}

.task-item:hover {
    transform: translateY(-2px);
}

.task-item h3 {
    color: #495057;
    margin-bottom: 8px;
    font-size: 1.2em;
}

.task-item p {
    color: #6c757d;
    margin-bottom: 10px;
    line-height: 1.5;
}

.task-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
    color: #6c757d;
}

.priority {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: 600;
}

.priority-1 { background: #d4edda; color: #155724; }
.priority-2 { background: #fff3cd; color: #856404; }
.priority-3 { background: #f8d7da; color: #721c24; }

/* Status Messages */
.status-message {
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-weight: 500;
    display: none;
}

.status-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    display: block;
}

.status-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    display: block;
}

.status-message.info {
    background: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
    display: block;
}

.loading {
    text-align: center;
    color: #6c757d;
    font-style: italic;
    padding: 40px;
}
```

**🎯 Test Point 1:** Open `frontend/index.html` in your browser. You should see a styled form and empty tasks section.

---

## 💻 Step 2: Add Client-Side JavaScript with Fetch (25 minutes)

### **2.1 Understanding Async/Await and Try/Catch**
```javascript
// Why we use async/await:
// - Makes asynchronous code look synchronous
// - Easier to read than .then() chains
// - Better error handling with try/catch

// Why we use try/catch:
// - Network requests can fail
// - Servers can return errors
// - User gets feedback instead of broken app
```

### **2.2 Create the JavaScript Application**
**File: `frontend/app.js`**
```javascript
/**
 * Life Hack Tutorial - Frontend JavaScript Application
 * 
 * This file handles:
 * - Form submission to create tasks (POST request)
 * - Loading tasks from the server (GET request)
 * - User interface updates
 * - Error handling and user feedback
 */

// ============================================================================
// API CLIENT CLASS - Handles all communication with backend
// ============================================================================

class TaskAPI {

    constructor() {
        // Backend server URL (will be running on port 8000)
        this.baseURL = 'http://localhost:8000';
    }

    /**
     * GET Request - Fetch all tasks from server
     * 
     * GET requests are used to RETRIEVE data
     * - No request body needed
     * - Data comes back in the response
     */
    async getTasks() {
        try {
            console.log('🔄 Making GET request to fetch tasks...');
            
            // Make the HTTP GET request
            const response = await fetch(`${this.baseURL}/api/tasks`);
            
            // Check if request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Parse JSON response
            const data = await response.json();
            console.log('✅ GET request successful:', data);
            
            return data;
            
        } catch (error) {
            console.error('❌ GET request failed:', error);
            
            // Re-throw error so calling code can handle it
            throw new Error(`Failed to fetch tasks: ${error.message}`);
        }
    }

    /**
     * POST Request - Send new task data to server
     * 
     * POST requests are used to SEND data to the server
     * - Data is sent in the request body as JSON
     * - Server processes the data and responds
     * 
     * @param {Object} taskData - The task data to send
     * @param {string} taskData.title - Task title
     * @param {string} taskData.description - Task description  
     * @param {number} taskData.priority - Priority level (1-3)
     */
    async createTask(taskData) {
        try {
            console.log('🔄 Making POST request to create task:', taskData);
            
            // Make the HTTP POST request
            const response = await fetch(`${this.baseURL}/api/tasks`, {
                method: 'POST',                           // HTTP method
                headers: {
                    'Content-Type': 'application/json',   // Tell server we're sending JSON
                },
                body: JSON.stringify(taskData)            // Convert object to JSON string
            });
            
            // Check if request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Parse JSON response
            const data = await response.json();
            console.log('✅ POST request successful:', data);
            
            return data;
            
        } catch (error) {
            console.error('❌ POST request failed:', error);
            
            // Re-throw error so calling code can handle it
            throw new Error(`Failed to create task: ${error.message}`);
        }
    }
}

// ============================================================================
// MAIN APPLICATION CLASS - Handles UI and user interactions
// ============================================================================

class LifeHackApp {
    constructor() {
        // Create API client instance
        this.api = new TaskAPI();
        
        // Array to store tasks
        this.tasks = [];
        
        // Initialize the application
        this.init();
    }

    /**
     * Initialize the application
     * Sets up event listeners and prepares the UI
     */
    init() {
        console.log('🚀 Initializing Life Hack App...');
        
        // Set up event listeners for user interactions
        this.setupEventListeners();
        
        // Show initial status
        this.showStatus('Application loaded. Ready to create and load tasks!', 'info');
    }

    /**
     * Set up event listeners for form submission and button clicks
     */
    setupEventListeners() {
        // Form submission event listener
        const taskForm = document.getElementById('task-form');
        taskForm.addEventListener('submit', (event) => {
            // Prevent default form submission (which would reload the page)
            event.preventDefault();
            
            // Handle the form submission
            this.handleFormSubmit(event);
        });

        // Load tasks button event listener
        const loadTasksBtn = document.getElementById('load-tasks-btn');
        loadTasksBtn.addEventListener('click', () => {
            this.loadTasks();
        });
    }

    /**
     * Handle form submission to create a new task
     * This demonstrates a POST request workflow
     * 
     * @param {Event} event - Form submission event
     */
    async handleFormSubmit(event) {
        try {
            console.log('📝 Form submitted, processing...');
            
            // Get form data
            const formData = this.extractFormData();
            
            // Validate form data
            if (!this.validateFormData(formData)) {
                return; // Validation failed, stop here
            }
            
            // Disable submit button to prevent double submission
            this.setSubmitButtonState(true, 'Creating task...');
            
            // Send POST request to create task
            const response = await this.api.createTask(formData);
            
            // Show success message
            this.showStatus(`Task "${response.task.title}" created successfully!`, 'success');
            
            // Clear the form
            this.clearForm();
            
            // Optionally reload tasks to show the new one
            await this.loadTasks();
            
        } catch (error) {
            // Handle any errors that occurred
            console.error('Error creating task:', error);
            this.showStatus(`Error: ${error.message}`, 'error');
            
        } finally {
            // Re-enable submit button regardless of success/failure
            this.setSubmitButtonState(false, 'Add Task');
        }
    }

    /**
     * Extract data from the form
     * 
     * @returns {Object} Form data object
     */
    extractFormData() {
        const title = document.getElementById('task-title').value.trim();
        const description = document.getElementById('task-description').value.trim();
        const priority = parseInt(document.getElementById('task-priority').value);
        
        return {
            title: title,
            description: description,
            priority: priority
        };
    }

    /**
     * Validate form data before sending to server
     * 
     * @param {Object} formData - Form data to validate
     * @returns {boolean} True if valid, false if invalid
     */
    validateFormData(formData) {
        // Check if title is provided
        if (!formData.title) {
            this.showStatus('Error: Task title is required', 'error');
            return false;
        }
        
        // Check if title is not too long
        if (formData.title.length > 100) {
            this.showStatus('Error: Task title must be 100 characters or less', 'error');
            return false;
        }
        
        // Check if priority is valid
        if (formData.priority < 1 || formData.priority > 3) {
            this.showStatus('Error: Priority must be between 1 and 3', 'error');
            return false;
        }
        
        return true;
    }

    /**
     * Load tasks from server using GET request
     * This demonstrates a GET request workflow
     */
    async loadTasks() {
        try {
            console.log('📋 Loading tasks from server...');
            
            // Update button state
            const loadButton = document.getElementById('load-tasks-btn');
            const originalText = loadButton.textContent;
            loadButton.textContent = 'Loading...';
            loadButton.disabled = true;
            
            // Send GET request to fetch tasks
            const response = await this.api.getTasks();
            
            // Store tasks in our application state
            this.tasks = response.tasks;
            
            // Update the UI to display tasks
            this.renderTasks();
            
            // Show success message
            this.showStatus(`Loaded ${response.count} task(s) from server`, 'success');
            
        } catch (error) {
            // Handle any errors that occurred
            console.error('Error loading tasks:', error);
            this.showStatus(`Error loading tasks: ${error.message}`, 'error');
            
        } finally {
            // Reset button state
            const loadButton = document.getElementById('load-tasks-btn');
            loadButton.textContent = 'Load Tasks from Server';
            loadButton.disabled = false;
        }
    }

    /**
     * Render tasks to the DOM
     * Updates the user interface to show current tasks
     */
    renderTasks() {
        const container = document.getElementById('tasks-container');
        
        // If no tasks, show empty state
        if (this.tasks.length === 0) {
            container.innerHTML = `
                <div class="loading">
                    No tasks found. Create your first task using the form above!
                </div>
            `;
            return;
        }

        // Generate HTML for all tasks
        const tasksHTML = this.tasks.map(task => {
            // Format the creation date
            const createdDate = new Date(task.created_at).toLocaleString();
            
            // Determine priority class for styling
            const priorityClass = `priority-${task.priority}`;
            const priorityText = ['', 'Low', 'Medium', 'High'][task.priority];
            
            return `
                <div class="task-item">
                    <h3>${this.escapeHtml(task.title)}</h3>
                    <p>${this.escapeHtml(task.description) || '<em>No description</em>'}</p>
                    <div class="task-meta">
                        <span class="priority ${priorityClass}">${priorityText} Priority</span>
                        <span>Created: ${createdDate}</span>
                    </div>
                </div>
            `;
        }).join('');

        // Update the container with tasks HTML
        container.innerHTML = `
            <div style="margin-bottom: 15px; padding: 10px; background: #e7f3ff; border-radius: 5px;">
                <strong>📊 Total Tasks: ${this.tasks.length}</strong>
            </div>
            ${tasksHTML}
        `;
    }

    /**
     * Show status message to user
     * 
     * @param {string} message - Message to display
     * @param {string} type - Type of message ('success', 'error', 'info')
     */
    showStatus(message, type) {
        const statusElement = document.getElementById('status-message');
        
        // Remove existing classes
        statusElement.className = 'status-message';
        
        // Add new class for message type
        statusElement.classList.add(type);
        
        // Set message text
        statusElement.textContent = message;
        
        // Auto-hide success and info messages after 5 seconds
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    }

    /**
     * Set submit button state (enabled/disabled)
     * 
     * @param {boolean} disabled - Whether button should be disabled
     * @param {string} text - Text to display on button
     */
    setSubmitButtonState(disabled, text) {
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = disabled;
        submitBtn.textContent = text;
    }

    /**
     * Clear the form after successful submission
     */
    clearForm() {
        document.getElementById('task-form').reset();
        // Reset priority to default (Medium)
        document.getElementById('task-priority').value = '2';
    }

    /**
     * Escape HTML to prevent XSS attacks
     * 
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ============================================================================
// INITIALIZE APPLICATION WHEN PAGE LOADS
// ============================================================================

// Wait for the DOM to be fully loaded before initializing the app
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌐 DOM loaded, creating Life Hack App...');
    
    // Create global app instance
    window.app = new LifeHackApp();
    
    console.log('✅ Life Hack App initialized and ready!');
});
```

**🎯 Test Point 2:** Open the browser developer tools (F12), go to Console tab, and refresh the page. You should see initialization messages. The form should be interactive, but API calls will fail (backend not running yet).

---

## 🔧 Step 3: Build the FastAPI Backend (30 minutes)

### **3.1 Understanding FastAPI Structure**
```python
# FastAPI Key Concepts:
# - @app.get() decorator creates GET endpoints
# - @app.post() decorator creates POST endpoints  
# - Pydantic models validate incoming data
# - async/await handles concurrent requests
# - CORS middleware allows frontend to connect
```

### **3.2 Create the FastAPI Application**
**File: `backend/main.py`**
```python
"""
Life Hack Tutorial - FastAPI Backend

This file creates two API endpoints:
1. GET /api/tasks - Returns all tasks
2. POST /api/tasks - Creates a new task

Key concepts demonstrated:
- FastAPI application setup
- CORS configuration for frontend communication
- Pydantic models for data validation
- In-memory data storage
- Error handling and HTTP status codes
"""

# Import required libraries
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import logging

# Configure logging to see what's happening
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================================
# PYDANTIC MODELS - Define data structures and validation
# ============================================================================

class TaskCreate(BaseModel):
    """
    Model for creating a new task
    This defines what data the client must send in POST requests
    """
    title: str = Field(..., min_length=1, max_length=100, description="Task title")
    description: str = Field("", max_length=500, description="Task description") 
    priority: int = Field(..., ge=1, le=3, description="Priority level (1=Low, 2=Medium, 3=High)")

    class Config:
        # Example data for API documentation
        schema_extra = {
            "example": {
                "title": "Learn FastAPI",
                "description": "Complete the tutorial and build endpoints",
                "priority": 2
            }
        }

class Task(BaseModel):
    """
    Model for a complete task (includes server-generated fields)
    This defines what data the server will return
    """
    id: int = Field(..., description="Unique task identifier")
    title: str = Field(..., description="Task title")
    description: str = Field(..., description="Task description")
    priority: int = Field(..., description="Priority level")
    created_at: str = Field(..., description="Creation timestamp")
    is_completed: bool = Field(False, description="Completion status")

class TaskResponse(BaseModel):
    """
    Model for API responses when creating tasks
    """
    message: str = Field(..., description="Response message")
    task: Task = Field(..., description="Created task data")
    total_tasks: int = Field(..., description="Total number of tasks")

class TaskListResponse(BaseModel):
    """
    Model for API responses when fetching all tasks
    """
    tasks: List[Task] = Field(..., description="List of all tasks")
    count: int = Field(..., description="Number of tasks returned")
    message: str = Field(..., description="Response message")

# ============================================================================
# FASTAPI APPLICATION SETUP
# ============================================================================

# Create FastAPI application instance
app = FastAPI(
    title="Life Hack Tutorial API",
    description="A simple API for managing life hack tasks",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI will be available at http://localhost:8000/docs
    redoc_url="/redoc"  # ReDoc documentation at http://localhost:8000/redoc
)

# ============================================================================
# CORS MIDDLEWARE - Allow frontend to communicate with backend
# ============================================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins like ["http://localhost:3000"]
    allow_credentials=False,  # Set to False when using allow_origins=["*"]
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# ============================================================================
# IN-MEMORY DATA STORAGE
# ============================================================================

# In a real application, you would use a database
# For this tutorial, we'll use simple Python lists
tasks_db: List[dict] = []

def get_next_task_id() -> int:
    """Generate the next available task ID"""
    if not tasks_db:
        return 1
    return max(task["id"] for task in tasks_db) + 1

def create_sample_data():
    """Create some sample tasks for testing"""
    global tasks_db
    
    sample_tasks = [
        {
            "id": 1,
            "title": "Learn FastAPI Basics",
            "description": "Complete the FastAPI tutorial and understand REST APIs",
            "priority": 2,
            "created_at": datetime.now().isoformat(),
            "is_completed": False
        },
        {
            "id": 2,
            "title": "Build Frontend Interface",
            "description": "Create HTML form and JavaScript to interact with API",
            "priority": 1,
            "created_at": datetime.now().isoformat(),
            "is_completed": True
        }
    ]
    
    tasks_db.extend(sample_tasks)
    logger.info(f"Created {len(sample_tasks)} sample tasks")

# Initialize sample data when the server starts
create_sample_data()

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint - Basic health check
    """
    return {
        "message": "Life Hack Tutorial API is running!",
        "version": "1.0.0",
        "endpoints": {
            "docs": "http://localhost:8000/docs",
            "tasks": "http://localhost:8000/api/tasks"
        }
    }

@app.get(
    "/api/tasks", 
    response_model=TaskListResponse,
    tags=["Tasks"],
    summary="Get all tasks",
    description="Retrieve all tasks from the database"
)
async def get_tasks():
    """
    GET /api/tasks - Retrieve all tasks
    
    This endpoint demonstrates:
    - GET request handling
    - Returning JSON data
    - Response model validation
    """
    try:
        logger.info(f"GET /api/tasks - Fetching {len(tasks_db)} tasks")
        
        # Return all tasks with metadata
        response = TaskListResponse(
            tasks=tasks_db,
            count=len(tasks_db),
            message="Tasks retrieved successfully"
        )
        
        logger.info(f"GET /api/tasks - Successfully returned {len(tasks_db)} tasks")
        return response
        
    except Exception as e:
        logger.error(f"GET /api/tasks - Error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve tasks"
        )

@app.post(
    "/api/tasks",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Tasks"],
    summary="Create a new task",
    description="Create a new task with title, description, and priority"
)
async def create_task(task_data: TaskCreate):
    """
    POST /api/tasks - Create a new task
    
    This endpoint demonstrates:
    - POST request handling
    - Request body validation with Pydantic
    - Data processing and storage
    - Returning created resource
    
    Args:
        task_data (TaskCreate): Task data from request body
        
    Returns:
        TaskResponse: Created task with metadata
        
    Raises:
        HTTPException: If task creation fails
    """
    try:
        logger.info(f"POST /api/tasks - Creating task: {task_data.title}")
        
        # Create new task dictionary
        new_task = {
            "id": get_next_task_id(),
            "title": task_data.title,
            "description": task_data.description,
            "priority": task_data.priority,
            "created_at": datetime.now().isoformat(),
            "is_completed": False
        }
        
        # Add to our in-memory storage
        tasks_db.append(new_task)
        
        # Create response
        response = TaskResponse(
            message="Task created successfully",
            task=new_task,
            total_tasks=len(tasks_db)
        )
        
        logger.info(f"POST /api/tasks - Successfully created task with ID {new_task['id']}")
        return response
        
    except Exception as e:
        logger.error(f"POST /api/tasks - Error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create task"
        )

# ============================================================================
# ADDITIONAL UTILITY ENDPOINTS
# ============================================================================

@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for monitoring
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "tasks_count": len(tasks_db)
    }

# ============================================================================
# SERVER STARTUP
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    
    print("🚀 Starting Life Hack Tutorial API...")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🔗 Frontend should connect to: http://localhost:8000")
    
    # Start the server
    uvicorn.run(
        app, 
        host="localhost",  # Only accept connections from localhost
        port=8000,         # Run on port 8000
        reload=True,       # Auto-reload when code changes
        log_level="info"   # Show informational logs
    )
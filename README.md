# Smart Budget Buddy 💰

An AI-powered personal finance management application that helps users track expenses, set budgets, and get intelligent financial insights using OpenAI's ChatGPT.

## 🚀 Overview

Smart Budget Buddy is a full-stack web application that combines modern web technologies with artificial intelligence to provide personalized financial guidance. Users can:

- **Track Expenses**: Log and categorize daily expenses
- **Set Budgets**: Create and manage budget limits for different categories
- **AI Insights**: Get personalized financial advice from ChatGPT
- **Spending Analysis**: Visualize spending patterns and trends
- **Smart Recommendations**: Receive AI-powered suggestions for saving money

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs with Python
- **Python 3.12+** - Core backend language
- **OpenAI API** - Integration with ChatGPT for AI-powered insights

### app
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling and responsive design
- **JavaScript (ES6+)** - Interactive app functionality
- **Chart.js** - Data visualization library

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Python 3.12+** - [Download Python](https://python.org/downloads/)
  - ⚠️ **Important**: Python 3.12 or higher is required for Pydantic v2 compatibility
  - The backend uses `model_dump()` method which requires Pydantic v2
- **Git** - Version control system
- **Text Editor** - VS Code, Sublime Text, or any code editor

**Optional**:
- **OpenAI API Key** - [Get your API key](https://platform.openai.com/api-keys) (not required for demo)
  - The application works with sample AI responses without an API key
- **Node.js 22** - Only needed for npm scripts (package.json commands)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smart-budget-buddy.git
cd smart-budget-buddy
```

### 2. Backend Setup (FastAPI)

**⚠️ Important Version Requirements:**
- **Python 3.10+** is required for Pydantic v2 compatibility
- The backend has been updated to use modern Pydantic syntax (`model_dump()` instead of deprecated `.dict()`)

```bash
# Install Python dependencies
npm run setup
# OR manually:
python -m pip install -r requirements.txt

# Alternative: Install core packages directly
pip install fastapi uvicorn python-dotenv pydantic
```

**Note**: OpenAI integration is optional - the app works with sample AI responses for demo purposes.

### 3. app Setup

The app is a simple HTML/CSS/JavaScript application that doesn't require a build process:

```bash
# No additional setup needed for app
# The app files are ready to use directly
```

Note: The `package.json` file is included for project metadata and development scripts, but no Node.js dependencies are required for the basic tutorial.

### 4. Environment Configuration (Optional)

Create a `.env` file in the root directory if you want to use OpenAI integration:

```env
# OpenAI Configuration (Optional - app works without this)
OPENAI_API_KEY=your_openai_api_key_here

# CORS Settings
FRONTEND_URL=http://localhost:3000
```

**Note**: The application includes sample AI responses and works perfectly without an OpenAI API key for educational purposes.

### 4. Database Setup

For this tutorial, the application uses in-memory storage with automatic test data loading, so no database setup is required. The data will be stored temporarily while the application is running.

```bash
# No database setup needed for the tutorial version
# Test data automatically loads when the backend starts
# Data includes 20 sample expenses and 7 sample budgets
```

**Key Features:**
- ✅ **Automatic Test Data Loading**: 20 expenses + 7 budgets load instantly
- ✅ **Reset Functionality**: Use `/api/reset-data` endpoint to reload fresh data
- ✅ **No Database Required**: Perfect for classroom environments

**Note**: For production use, you would want to implement a proper database like SQLite or PostgreSQL.

## � Recent Updates & Fixes

### What Was Fixed

The Smart Budget Buddy application has been updated to resolve several common issues that students encountered:

#### ✅ **CORS Issues Resolved**
- **Problem**: Frontend couldn't communicate with backend due to CORS policy
- **Solution**: Simplified CORS configuration to `allow_origins=["*"]` for development
- **Removed**: Complex OPTIONS handler that was conflicting with FastAPI's built-in CORS

#### ✅ **Pydantic Compatibility Updated** 
- **Problem**: Code used deprecated `.dict()` method causing errors
- **Solution**: Updated to modern Pydantic v2 syntax using `model_dump()`
- **Requirement**: Python 3.10+ now required for compatibility

#### ✅ **OpenAI Dependency Made Optional**
- **Problem**: Students couldn't run app without OpenAI API key
- **Solution**: App now works with sample AI responses, no API key required
- **Benefit**: Perfect for classroom environments with no external dependencies

#### ✅ **Improved npm Scripts**
- **Problem**: Confusing script names in package.json
- **Solution**: Clearer command names:
  - `npm run setup` - Install Python dependencies
  - `npm run run-backend-server` - Start FastAPI server
  - `npm run run-website` - Start frontend server

#### ✅ **Removed Node.js Dependencies**
- **Problem**: Unnecessary Node.js packages causing setup complexity
- **Solution**: Removed live-server and other Node.js dependencies
- **Result**: Simplified setup using only Python's built-in HTTP server

### Technical Changes Made

```python
# OLD (Deprecated - caused errors):
expense_dict = expense.dict()

# NEW (Modern Pydantic v2):
expense_dict = expense.model_dump()
```

```python
# OLD (Complex CORS - caused issues):
allow_origins=[
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    # ... multiple origins
]

# NEW (Simplified for development):
allow_origins=["*"]  # Allow all origins for development
```

### Verification

You can verify these fixes work by:
1. **No CORS Errors**: Browser console should be clear of CORS-related errors
2. **Fast Startup**: Backend starts without dependency issues
3. **Test Data Loads**: 20 expenses + 7 budgets appear immediately
4. **Cross-Platform**: Works on Windows, Mac, and Linux

## �🚀 Running the Application

### Quick Start (Recommended)

The application consists of two parts that need to be running simultaneously:

#### 1. Start Backend Server (FastAPI)

```bash
# From root directory 
npm run run-backend-server
```

This will:
- Install Python dependencies automatically (if using `npm run setup` first)
- Start the FastAPI server on `http://localhost:8000`
- **Automatically load all test data** (20 sample expenses + 7 budgets)
- Enable API documentation at `http://localhost:8000/docs`
- Use modern Pydantic v2 syntax for better performance

**🔄 How Test Data Loading Works:**
When the backend starts, it automatically runs these lines from `main.py`:
```python
# In-memory storage initialized with sample data
expenses_db = get_sample_expenses()  # Loads 20 sample expenses
budgets_db = get_sample_budgets()    # Loads 7 sample budgets
```

You'll see test data is loaded when you visit the API endpoints:
- `http://localhost:8000/api/expenses` - Shows 20 sample expenses
- `http://localhost:8000/api/budgets` - Shows 7 sample budgets

**🛠️ Alternative Manual Command:**
```bash
python -m uvicorn main:app --reload --host localhost --port 8000
```

#### 2. Start Frontend Development Server

```bash
# From root directory (in a new terminal)
npm run run-website
```

This will:
- Start the frontend server on `http://localhost:3000`
- Serve the HTML/CSS/JavaScript files from the `app/` directory
- Connect to the backend API automatically
- Bind to localhost for security

**🛠️ Alternative Manual Commands:**
```bash
# Option 1: Using the app directory
cd app && python -m http.server 3000 --bind localhost

# Option 2: Alternative port if 3000 is busy
cd app && python -m http.server 8080 --bind localhost
```

#### 3. Access the Application

Open your browser to: `http://localhost:3000`

You'll see the Smart Budget Buddy app with:
- ✅ 20 sample expenses already loaded
- ✅ 7 sample budgets for different categories  
- ✅ Sample questions to ask the AI
- ✅ Reset button to reload test data

**🔍 Verify Test Data is Working:**
If you don't see any expenses or budgets in the app, check:
1. **Backend is running**: `curl http://localhost:8000/health`
2. **Test data loaded**: `curl http://localhost:8000/api/expenses | jq '.expenses | length'` (should return 20)
3. **Frontend can connect**: Check browser developer console for errors
4. **CORS is working**: Updated CORS settings allow all origins for development

**🔧 Recent Updates (Fixed Issues):**
- ✅ **Fixed CORS Issues**: Simplified CORS configuration for development
- ✅ **Updated Pydantic Syntax**: Uses `model_dump()` instead of deprecated `.dict()`
- ✅ **Removed OpenAI Dependency**: Works with sample responses (no API key needed)
- ✅ **Improved npm Scripts**: Clearer command names in `package.json`

**🚀 Quick Verification Script:**
Run this script to verify everything is working:
```bash
python verify_setup.py
```
This will check backend health, test data loading, and frontend accessibility.

### Alternative Commands

If you prefer manual commands or the npm scripts don't work:

```bash
# Setup: Install Python dependencies
python -m pip install -r requirements.txt

# Backend (Terminal 1)
python -m uvicorn main:app --reload --host localhost --port 8000

# Frontend (Terminal 2) 
cd app && python -m http.server 3000 --bind localhost

# Frontend alternative port if 3000 is busy
cd app && python -m http.server 8080 --bind localhost
```

**📝 Available npm Scripts:**
```bash
npm run setup                # Install Python dependencies
npm run run-backend-server   # Start FastAPI backend on port 8000  
npm run run-website         # Start frontend on port 3000
npm run build               # Build assets (development only)
npm run test                # Run tests (placeholder)
```

**Note**: Make sure both servers are running simultaneously for the app to work properly.

## 📊 Test Data

The application comes with comprehensive test data that loads automatically:

### What's Included
- **20 Sample Expenses**: Realistic expenses across 7 categories
  - Food: Grocery shopping, coffee, restaurant meals
  - Transport: Metro tickets, Uber rides, gas
  - Entertainment: Movie tickets, Netflix, concerts
  - Shopping: Shoes, books, clothing
  - Utilities: Electric, internet, water bills
  - Healthcare: Prescriptions, doctor visits
  - Other: Bank fees, gifts

- **7 Sample Budgets**: Monthly budget limits for each category
  - Food: $400/month
  - Transport: $150/month
  - Entertainment: $100/month
  - Shopping: $200/month
  - Utilities: $180/month
  - Healthcare: $250/month
  - Other: $100/month

- **Sample AI Questions**: Pre-written questions students can ask
  - "How can I reduce my spending on food?"
  - "What's my biggest expense category?"
  - "Give me tips to save money on transportation"
  - And more...

### How Test Data Loads
1. **Automatic Loading**: When you start the backend with `npm run backend`, test data loads automatically
   - The backend imports functions from `test_data.py`
   - On startup, `main.py` executes: `expenses_db = get_sample_expenses()` and `budgets_db = get_sample_budgets()`
   - This happens immediately when the server starts - no additional commands needed!

2. **Verify Data is Loaded**: You can check the data loaded successfully:
   ```bash
   # Check expenses (should show 20 items)
   curl http://localhost:8000/api/expenses
   
   # Check budgets (should show 7 items)
   curl http://localhost:8000/api/budgets
   ```

3. **API Access**: All data is available via REST API endpoints
4. **Reset Feature**: Use the "Reset Data" button in the app to reload fresh test data
5. **Interactive**: Students can add their own expenses and budgets on top of the sample data

### Production Mode

```bash
# Start production server (from root directory)
uvicorn main:app --host 0.0.0.0 --port 8000

# Serve app files using a web server like nginx
# Or use Python's built-in server for development
cd app
python -m http.server 3000
```

## 📁 Project Structure

```
smart-budget-buddy/
├── main.py                     # FastAPI application entry point
├── test_data.py                # Sample data for demonstration
├── load_test_data.py          # Utility to inspect test data
├── verify_setup.py            # Script to verify everything is working
├── requirements.txt            # Python dependencies
├── package.json               # Project metadata and dev scripts
├── .env.example               # Environment variables template
├── app/
│   ├── index.html              # Main HTML file
│   ├── css/
│   │   ├── style.css          # Main styles
│   │   └── responsive.css     # Responsive design
│   └── js/
│       ├── app.js             # Main application logic
│       ├── api.js             # API communication
│       └── charts.js          # Data visualization
└── README.md                  # This file
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense

### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/{id}` - Update budget

### AI Insights
- `POST /api/ai/insights` - Get AI-powered financial insights
- `POST /api/ai/recommendations` - Get spending recommendations

## 🤖 AI Features

### ChatGPT Integration

The application uses OpenAI's ChatGPT to provide:

1. **Expense Analysis**: AI analyzes spending patterns and provides insights
2. **Budget Recommendations**: Smart suggestions for budget allocation
3. **Savings Tips**: Personalized advice based on spending habits
4. **Financial Goal Planning**: AI-assisted goal setting and tracking

### Example AI Prompts

```python
# Expense analysis prompt
"Analyze my spending data and provide insights on where I can save money"

# Budget recommendation prompt
"Based on my income and expenses, suggest an optimal budget allocation"
```

## 🎨 Features

### Core Features
- ✅ Expense tracking with categories
- ✅ Budget creation and monitoring
- ✅ AI-powered financial insights
- ✅ Spending visualization charts
- ✅ Monthly/yearly reports

### Advanced Features
- 🔄 Recurring transaction management
- 📊 Interactive spending charts
- 💡 Smart savings recommendations
- 📱 Responsive mobile design
- 🔐 Secure user authentication

## 🧪 Testing

### Manual Testing

This tutorial version uses manual testing. Test the application by:

1. **API Testing**: Visit `http://localhost:8000/docs` to test API endpoints
2. **app Testing**: 
   - Add expenses and budgets through the UI
   - Test responsive design on different screen sizes
   - Verify AI insights functionality
3. **Browser Console**: Check for JavaScript errors in browser developer tools

### Future Improvements

For a production version, consider adding:
- **Backend Tests**: Unit tests with pytest
- **app Tests**: JavaScript tests with Jest or similar
- **Integration Tests**: End-to-end testing with Playwright or Cypress

## 🚀 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
# Create Heroku app
heroku create smart-budget-buddy

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key_here
heroku config:set SECRET_KEY=your_secret_key

# Deploy
git push heroku main
```

### Deploy to AWS/Digital Ocean

1. Set up server with Python 3.8+
2. Install dependencies
3. Configure environment variables
4. Set up reverse proxy (Nginx)
5. Use process manager (PM2/Supervisor)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Rob Thomas** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- OpenAI for providing the ChatGPT API
- FastAPI community for excellent documentation
- All contributors and testers

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/yourusername/smart-budget-buddy/issues) page
2. Create a new issue if your problem isn't already listed
3. Contact us at support@smartbudgetbuddy.com

---

**Happy Budgeting! 💰✨**

## 📚 Tutorial for Class

This project is designed as a comprehensive tutorial for learning full-stack web development with AI integration. Follow these steps to build your Smart Budget Buddy application:

### 🎯 Learning Objectives

By the end of this tutorial, you will learn:
- **Backend Development**: Building REST APIs with FastAPI and Python
- **app Development**: Creating interactive web interfaces with HTML, CSS, and JavaScript
- **AI Integration**: Connecting to OpenAI's ChatGPT API for intelligent features
- **Database Operations**: Managing data with SQLAlchemy and SQLite
- **API Communication**: Making HTTP requests between app and backend
- **Responsive Design**: Creating mobile-friendly user interfaces

### 📋 Prerequisites

Before starting this tutorial, make sure you have:
- Basic knowledge of Python programming
- Understanding of HTML, CSS, and JavaScript
- Familiarity with command-line operations
- Text editor or IDE (VS Code recommended)

### 🚀 Step-by-Step Tutorial

#### Step 2: Environment Setup (15 minutes)

1. **Clone the project**:
   ```bash
   git clone <repository-url>
   cd smart-budget-buddy
   ```

2. **Set up Python environment** (Python 3.10+ required):
   ```bash
   # Check Python version first
   python --version  # Should be 3.10+
   
   # Install dependencies
   npm run setup
   # OR manually:
   python -m pip install -r requirements.txt
   ```

3. **Optional - Set up environment variables**:
   ```bash
   # Create .env file only if you want OpenAI integration
   echo "OPENAI_API_KEY=your_key_here" > .env
   # App works with sample responses without this
   ```

#### Step 3: Explore the Backend (30 minutes)

1. **Understand the FastAPI structure**:
   - Open `main.py` and examine the API endpoints
   - Study the Pydantic models for data validation (now using modern v2 syntax)
   - Learn about simplified CORS middleware setup (`allow_origins=["*"]` for development)

2. **Test the API**:
   ```bash
   npm run run-backend-server
   ```
   - Visit `http://localhost:8000/docs` for interactive API documentation
   - **Important**: Test data is automatically loaded when the server starts!
   - Verify data loading: `curl http://localhost:8000/api/expenses` (should show 20 items)
   - Test endpoints using the built-in Swagger UI

3. **Key concepts to understand**:
   - RESTful API design
   - Request/response handling with Pydantic v2
   - Modern `model_dump()` method instead of deprecated `.dict()`
   - Simplified CORS configuration for development
   - In-memory data storage with automatic test data loading

#### Step 4: app Development (45 minutes)

1. **HTML Structure** (`app/index.html`):
   - Study the semantic HTML structure
   - Understand the single-page application layout
   - Learn about responsive design principles

2. **CSS Styling** (`app/css/`):
   - Explore modern CSS techniques
   - Study flexbox and grid layouts
   - Learn about CSS variables and animations

3. **JavaScript Functionality** (`app/js/`):
   - `api.js`: API communication layer (connects to `http://localhost:8000`)
   - `charts.js`: Data visualization with Chart.js
   - `app.js`: Main application logic and DOM manipulation

**🔧 Testing Frontend Connection:**
```bash
# Start frontend in separate terminal
npm run run-website
# Visit http://localhost:3000
```

#### Step 5: AI Integration (30 minutes)

1. **AI Integration Notes**:
   - **No API Key Required**: The app includes sample AI responses for demo purposes
   - **Optional OpenAI Setup**: Add `OPENAI_API_KEY` to `.env` for real responses
   - **Sample Data**: Includes pre-written questions and contextual responses

2. **Study the AI endpoint**:
   - Examine the `/api/ai/insights` endpoint in `main.py`
   - Learn how to structure prompts for financial advice
   - Understand the fallback to sample responses when no API key is provided

3. **Test AI features**:
   - Use the pre-loaded sample expenses (20 items)
   - Ask questions like "How can I reduce my spending?"
   - Observe the AI-generated responses (sample or real depending on setup)

**🤖 Sample Questions Available:**
- "How can I reduce my spending on food?"
- "What's my biggest expense category?"
- "Give me tips to save money on transportation"

#### Step 6: Testing and Debugging (20 minutes)

1. **Test the complete application**:
   ```bash
   # Terminal 1: Start backend (with auto-loaded test data)
   npm run run-backend-server
   
   # Terminal 2: Start app
   npm run run-website
   ```

2. **Test all features**:
   - **Verify Test Data**: Should see 20 expenses and 7 budgets automatically loaded
   - **Add New Data**: Add expenses and budgets through the UI
   - **View Dashboard**: Check that charts display correctly
   - **AI Insights**: Ask sample questions and verify responses
   - **Responsive Design**: Test on mobile and desktop viewports
   - **API Connectivity**: Check browser console for any CORS or API errors

3. **Common Verification Steps**:
   ```bash
   # Check backend health
   curl http://localhost:8000/health
   
   # Verify test data loaded
   curl http://localhost:8000/api/expenses | jq '.expenses | length'
   
   # Test frontend accessibility
   curl -I http://localhost:3000
   ```

### 📊 Test Data

The project includes comprehensive test data to help students understand how the application works:

#### Sample Data Includes:
- **20 Sample Expenses** across different categories (food, transport, entertainment, etc.)
- **7 Sample Budgets** with realistic monthly limits
- **AI Insights** with varied responses based on spending patterns
- **Sample Questions** to demonstrate AI functionality

#### Working with Test Data:

1. **View Test Data Summary**:
   ```bash
   python load_test_data.py
   ```

2. **Reset Data via API**:
   ```bash
   curl -X POST http://localhost:8000/api/reset-data
   ```

3. **Restart Backend**:
   ```bash
   # Stop backend (Ctrl+C) and restart
   npm run backend
   ```

#### Test Data Features:
- **Realistic Amounts**: Expenses range from $3.50 to $156.78
- **Recent Dates**: Expenses span the last 15 days
- **Varied Categories**: 7 different expense categories
- **Budget Comparison**: Some categories are over/under budget
- **Smart AI Responses**: Context-aware insights based on spending patterns

---

## 🔧 Troubleshooting

### Common Issues and Solutions

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Backend Won't Start

**Problem**: `npm run run-backend-server` fails or shows errors

**Solutions**:
1. **Check Python Version**:
   ```bash
   python --version  # Should be 3.10 or higher
   py --version      # On Windows, try this if python fails
   ```

2. **Install Dependencies**:
   ```bash
   npm run setup
   # OR manually:
   python -m pip install -r requirements.txt
   ```

3. **Check for Import Errors**:
   ```bash
   python -c "import fastapi, uvicorn, pydantic; print('Dependencies OK')"
   ```

4. **Manual Start**:
   ```bash
   python -m uvicorn main:app --reload --host localhost --port 8000
   ```

5. **Windows Specific**:
   ```bash
   py -m uvicorn main:app --reload --host localhost --port 8000
   ```

#### Frontend Won't Start

**Problem**: `npm run run-website` fails or shows errors

**Solutions**:
1. **Check Port Availability**:
   ```bash
   # Kill any process using port 3000
   lsof -ti:3000 | xargs kill -9  # Linux/Mac
   netstat -ano | findstr :3000   # Windows
   ```

2. **Try Alternative Port**:
   ```bash
   cd app && python -m http.server 8080 --bind localhost
   ```

3. **Manual Start**:
   ```bash
   cd app && python -m http.server 3000 --bind localhost
   ```

#### API Connection Issues (CORS Errors)

**Problem**: Frontend can't connect to backend (Fixed in recent updates)

**Solutions**:
1. **Verify Backend is Running**:
   ```bash
   curl http://localhost:8000/health
   ```

2. **Check API Base URL** in `app/js/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8000';
   ```

3. **CORS Configuration**: The backend now uses `allow_origins=["*"]` for development
4. **Restart Both Servers**: Stop both servers and restart them in order

#### Test Data Not Loading

**Problem**: No expenses or budgets appear in the app

**Solutions**:
1. **Check API Endpoints**:
   ```bash
   curl http://localhost:8000/api/expenses
   curl http://localhost:8000/api/budgets
   ```

2. **Reset Test Data**:
   ```bash
   curl -X POST http://localhost:8000/api/reset-data
   ```

3. **Restart Backend**: The latest version auto-loads test data on startup

#### Python Command Issues (Windows)

**Problem**: `python` command not found on Windows

**Solutions**:
1. **Use Python Launcher**:
   ```bash
   py -m pip install -r requirements.txt
   py -m uvicorn main:app --reload --host localhost --port 8000
   ```

2. **Add Python to PATH**: During Python installation, check "Add Python to PATH"

3. **Use Full Path**: Find Python installation and use full path

#### Pydantic Version Issues

**Problem**: Errors about `.dict()` method or Pydantic compatibility

**Solutions**:
1. **Check Python Version**: Must be Python 3.10+
2. **Update Dependencies**:
   ```bash
   pip install --upgrade pydantic fastapi
   ```

3. **The codebase has been updated to use `model_dump()` instead of deprecated `.dict()`

### Quick Debug Commands

```bash
# Quick verification of entire setup
python verify_setup.py

# Check Python version (must be 3.10+)
python --version
py --version  # On Windows

# Check if backend is running
curl http://localhost:8000/health

# Check if frontend is accessible  
curl http://localhost:3000

# Verify test data is loaded (should return 20)
curl http://localhost:8000/api/expenses | jq '.expenses | length'

# Check sample questions
curl http://localhost:8000/api/sample-questions

# Test package dependencies
python -c "import fastapi, uvicorn, pydantic; print('Dependencies OK')"

# Reset test data
curl -X POST http://localhost:8000/api/reset-data
```

### Getting Help

If you encounter issues not covered here:

1. **Check the Console**: Look for error messages in your browser's developer console
2. **Check Terminal Output**: Look for error messages in the terminal where you started the servers
3. **API Documentation**: Visit `http://localhost:8000/docs` for interactive API documentation
4. **Reset Everything**: Stop both servers, restart them, and refresh your browser

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Happy budgeting! 💰✨**

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
- **Python 3.8+** - Core backend language
- **OpenAI API** - Integration with ChatGPT for AI-powered insights

### app
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling and responsive design
- **JavaScript (ES6+)** - Interactive app functionality
- **Chart.js** - Data visualization library

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Python 3.8+** - [Download Python](https://python.org/downloads/)
- **Git** - Version control system
- **Text Editor** - VS Code, Sublime Text, or any code editor
- **OpenAI API Key** - [Get your API key](https://platform.openai.com/api-keys)

**Optional**:
- **Node.js 16+** - Only needed if you want to use development tools (not required for basic tutorial)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smart-budget-buddy.git
cd smart-budget-buddy
```

### 2. Backend Setup (FastAPI)

```bash
# Install Python dependencies
pip install -r requirements.txt

# Alternative: Install core packages directly
pip install fastapi uvicorn python-dotenv openai
```

### 3. app Setup

The app is a simple HTML/CSS/JavaScript application that doesn't require a build process:

```bash
# No additional setup needed for app
# The app files are ready to use directly
```

Note: The `package.json` file is included for project metadata and development scripts, but no Node.js dependencies are required for the basic tutorial.

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Database Configuration
DATABASE_URL=sqlite:///./budget_buddy.db

# FastAPI Configuration
SECRET_KEY=your_secret_key_here
DEBUG=True

# CORS Settings
app_URL=http://localhost:3000
```

### 4. Database Setup

For this tutorial, the application uses in-memory storage, so no database setup is required. The data will be stored temporarily while the application is running.

```bash
# No database setup needed for the tutorial version
# Data is stored in memory and will reset when the server restarts
```

**Note**: For production use, you would want to implement a proper database like SQLite or PostgreSQL.

## 🚀 Running the Application

### Quick Start (Recommended)

The application consists of two parts that need to be running simultaneously:

#### 1. Start Backend Server (FastAPI)

```bash
# From root directory 
npm run backend
```

This will:
- Start the FastAPI server on `http://localhost:8000`
- **Automatically load all test data** (20 sample expenses + 7 budgets)
- Enable API documentation at `http://localhost:8000/docs`

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

#### 2. Start Frontend Development Server

```bash
# From root directory (in a new terminal)
npm run dev
```

This will:
- Start the frontend server on `http://localhost:3000`
- Serve the HTML/CSS/JavaScript files
- Connect to the backend API automatically

#### 3. Access the Application

Open your browser to: `http://localhost:3000`

You'll see the Smart Budget Buddy app with:
- ✅ 20 sample expenses already loaded
- ✅ 7 sample budgets for different categories  
- ✅ Sample questions to ask the AI
- ✅ Reset button to reload test data

**🔍 Verify Test Data is Working:**
If you don't see any expenses or budgets in the app, check:
1. Backend is running: `curl http://localhost:8000/health`
2. Test data loaded: `curl http://localhost:8000/api/expenses | jq '.expenses | length'` (should return 20)
3. Frontend can connect: Check browser developer console for errors

**🚀 Quick Verification Script:**
Run this script to verify everything is working:
```bash
python verify_setup.py
```
This will check backend health, test data loading, and frontend accessibility.

### Alternative Commands

If you prefer manual commands:

```bash
# Backend (Terminal 1)
python -m uvicorn main:app --reload --host localhost --port 8000

# Frontend (Terminal 2)
cd app && python -m http.server 3000

# Frontend alternative port
cd app && python -m http.server 8080
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

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

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

#### Step 1: Environment Setup (15 minutes)

1. **Clone the project**:
   ```bash
   git clone <repository-url>
   cd smart-budget-buddy
   ```

2. **Set up Python environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env file and add your OpenAI API key
   ```

#### Step 2: Explore the Backend (30 minutes)

1. **Understand the FastAPI structure**:
   - Open `main.py` and examine the API endpoints
   - Study the Pydantic models for data validation
   - Learn about CORS middleware setup

2. **Test the API**:
   ```bash
   npm run backend
   ```
   - Visit `http://localhost:8000/docs` for interactive API documentation
   - **Important**: Test data is automatically loaded when the server starts!
   - Verify data loading: `curl http://localhost:8000/api/expenses` (should show 20 items)
   - Test endpoints using the built-in Swagger UI

3. **Key concepts to understand**:
   - RESTful API design
   - Request/response handling
   - Data validation with Pydantic
   - Error handling

#### Step 3: app Development (45 minutes)

1. **HTML Structure** (`app/index.html`):
   - Study the semantic HTML structure
   - Understand the single-page application layout
   - Learn about responsive design principles

2. **CSS Styling** (`app/css/`):
   - Explore modern CSS techniques
   - Study flexbox and grid layouts
   - Learn about CSS variables and animations

3. **JavaScript Functionality** (`app/js/`):
   - `api.js`: API communication layer
   - `charts.js`: Data visualization with Chart.js
   - `app.js`: Main application logic and DOM manipulation

#### Step 4: AI Integration (30 minutes)

1. **OpenAI API Setup**:
   - Obtain an OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
   - Add the key to your `.env` file

2. **Study the AI endpoint**:
   - Examine the `/api/ai/insights` endpoint in `main.py`
   - Learn how to structure prompts for financial advice
   - Understand error handling for AI API calls

3. **Test AI features**:
   - Add some sample expenses
   - Ask questions like "How can I reduce my spending?"
   - Observe the AI-generated responses

#### Step 5: Testing and Debugging (20 minutes)

1. **Test the complete application**:
   ```bash
   # Terminal 1: Start backend
   uvicorn main:app --reload
   
   # Terminal 2: Start app
   cd app
   python -m http.server 3000
   ```

2. **Test all features**:
   - Add expenses and budgets
   - View dashboard charts
   - Ask AI for financial insights
   - Test responsive design on mobile

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

#### Backend Won't Start

**Problem**: `npm run backend` fails or shows errors

**Solutions**:
1. **Check Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Check Port Availability**:
   ```bash
   # Kill any process using port 8000
   lsof -ti:8000 | xargs kill -9
   ```

3. **Manual Start**:
   ```bash
   python -m uvicorn main:app --reload --host localhost --port 8000
   ```

#### Frontend Won't Start

**Problem**: `npm run dev` fails or shows errors

**Solutions**:
1. **Check Port Availability**:
   ```bash
   # Kill any process using port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Try Alternative Port**:
   ```bash
   npm run dev:8080
   ```

3. **Manual Start**:
   ```bash
   cd app && python -m http.server 3000
   ```

#### API Connection Issues

**Problem**: Frontend can't connect to backend

**Solutions**:
1. **Verify Backend is Running**:
   ```bash
   curl http://localhost:8000/health
   ```

2. **Check API Base URL** in `app/js/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8000';
   ```

3. **CORS Issues**: Make sure both servers are running on the expected ports

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

3. **Restart Backend**:
   ```bash
   # Stop backend (Ctrl+C) and restart
   npm run backend
   ```

#### AI Insights Not Working

**Problem**: AI responses are not generating

**Solutions**:
1. **Check OpenAI API Key** in `.env` file
2. **For Development**: The app uses sample AI responses, so this should work without an API key
3. **Check Network**: Ensure no firewall is blocking connections

### Quick Debug Commands

```bash
# Quick verification of entire setup
python verify_setup.py

# Check if backend is running
curl http://localhost:8000/health

# Check if frontend is accessible
curl http://localhost:3000

# Verify test data is loaded
curl http://localhost:8000/api/expenses | jq '.expenses | length'

# Check sample questions
curl http://localhost:8000/api/sample-questions
```

### Getting Help

If you encounter issues not covered here:

1. **Check the Console**: Look for error messages in your browser's developer console
2. **Check Terminal Output**: Look for error messages in the terminal where you started the servers
3. **API Documentation**: Visit `http://localhost:8000/docs` for interactive API documentation
4. **Reset Everything**: Stop both servers, restart them, and refresh your browser

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Happy budgeting! 💰✨**

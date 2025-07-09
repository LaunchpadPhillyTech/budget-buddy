# Smart Budget Buddy - Mermaid Wireframes

## 1. User Flow Diagram

```mermaid
flowchart TD
    A[New User Visits App] --> B{Has Data?}
    B -->|No| C[Show Welcome/Onboarding]
    B -->|Yes| D[Show Dashboard]
    
    C --> E[Start Tour]
    C --> F[Explore Sample Data]
    C --> G[Skip to Dashboard]
    
    E --> H[Guided Tour Steps]
    F --> I[Dashboard with Test Data]
    G --> I
    H --> I
    
    I --> J[Dashboard Navigation]
    J --> K[Expenses Tab]
    J --> L[Budgets Tab]
    J --> M[AI Insights Tab]
    
    M --> N[Sample Questions]
    M --> O[Custom Question Input]
    
    N --> P[Click Sample Question]
    O --> Q[Type Custom Question]
    
    P --> R[AI Response Display]
    Q --> R
    
    R --> S[Ask Follow-up Question]
    R --> T[Return to Dashboard]
    
    S --> O
    T --> I
    
    style A fill:#e1f5fe
    style C fill:#f3e5f5
    style M fill:#e8f5e8
    style R fill:#fff3e0
```

## 2. Screen Layout Diagram

```mermaid
graph TB
    subgraph "Desktop Layout (1200px+)"
        A["Header Bar<br/>Logo + Navigation + Skip Tour"]
        
        subgraph "Main Content Area"
            B[Welcome Modal/Card]
            C[Dashboard Grid]
            D[AI Insights Interface]
        end
        
        E[Footer]
    end
    
    A --> B
    A --> C
    A --> D
    B --> E
    C --> E
    D --> E
    
    style A fill:#2196f3,color:#fff
    style B fill:#9c27b0,color:#fff
    style C fill:#4caf50,color:#fff
    style D fill:#ff9800,color:#fff
    style E fill:#607d8b,color:#fff
```

## 3. Onboarding Flow Diagram

```mermaid
sequenceDiagram
    participant U as New User
    participant A as App Interface
    participant D as Test Data
    participant AI as AI Assistant
    
    U->>A: Visits Smart Budget Buddy
    A->>D: Check if sample data exists
    D->>A: No data found
    A->>U: Show Welcome Modal
    
    Note over U,A: Welcome Screen with Options
    
    U->>A: Click "Start Tour"
    A->>U: Show Step 1: Dashboard Overview
    A->>U: Show Step 2: Add Expense Demo
    A->>U: Show Step 3: Budget Creation
    A->>U: Show Step 4: AI Insights Preview
    
    U->>A: Complete Tour
    A->>D: Load sample data (20 expenses, 7 budgets)
    D->>A: Data loaded successfully
    A->>U: Show Dashboard with sample data
    
    U->>A: Click "AI Insights" tab
    A->>U: Show AI interface with sample questions
    U->>A: Click sample question
    A->>AI: Send question with context
    AI->>A: Return personalized advice
    A->>U: Display AI response
```

## 4. AI Insights Interface Diagram

```mermaid
graph LR
    subgraph "AI Insights Screen"
        A["Screen Header<br/>Smart Budget Buddy"]
        B["Navigation Tabs<br/>Dashboard • Expenses • Budgets • AI Insights"]
        
        subgraph "Content Area"
            C[Sample Questions Section]
            D[Custom Question Input]
            E[AI Response Display]
        end
        
        subgraph "Sample Questions"
            F["How can I reduce spending on food?"]
            G["What's my biggest expense category?"]
            H["Transportation saving tips?"]
            I["Entertainment budget advice?"]
        end
        
        subgraph "AI Response Area"
            J[Question Echo]
            K[AI Recommendations]
            L[Follow-up Suggestions]
        end
    end
    
    A --> B
    B --> C
    B --> D
    C --> F
    C --> G
    C --> H
    C --> I
    
    F --> J
    G --> J
    H --> J
    I --> J
    D --> J
    
    J --> K
    K --> L
    L --> D
    
    style A fill:#1976d2,color:#fff
    style B fill:#388e3c,color:#fff
    style C fill:#f57c00,color:#fff
    style D fill:#7b1fa2,color:#fff
    style E fill:#d32f2f,color:#fff
```

## 5. Component Hierarchy Diagram

```mermaid
graph TD
    A[Smart Budget Buddy App] --> B[Header Component]
    A --> C[Main Content]
    A --> D[Footer Component]
    
    B --> E[Logo]
    B --> F[Navigation Menu]
    B --> G[Skip Tour Button]
    
    C --> H[Welcome Modal]
    C --> I[Dashboard Section]
    C --> J[AI Insights Section]
    
    H --> K[Welcome Message]
    H --> L[Feature List]
    H --> M[Action Buttons]
    
    I --> N[Stats Cards]
    I --> O[Charts Area]
    I --> P[Quick Actions]
    
    J --> Q[Sample Questions]
    J --> R[Question Input]
    J --> S[AI Response]
    
    Q --> T[Question Button 1]
    Q --> U[Question Button 2]
    Q --> V[Question Button 3]
    Q --> W[Question Button 4]
    
    R --> X[Text Area]
    R --> Y[Submit Button]
    
    S --> Z[Response Text]
    S --> AA[Follow-up Questions]
    
    style A fill:#e3f2fd
    style H fill:#f3e5f5
    style I fill:#e8f5e8
    style J fill:#fff3e0
```

## 6. State Flow Diagram

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> WelcomeScreen : First time user
    Loading --> Dashboard : Returning user
    
    WelcomeScreen --> TourStep1 : Start Tour
    WelcomeScreen --> Dashboard : Skip/Explore Data
    
    TourStep1 --> TourStep2 : Next
    TourStep2 --> TourStep3 : Next
    TourStep3 --> TourStep4 : Next
    TourStep4 --> Dashboard : Complete Tour
    
    Dashboard --> ExpensesTab : Click Expenses
    Dashboard --> BudgetsTab : Click Budgets
    Dashboard --> AIInsights : Click AI Insights
    
    AIInsights --> QuestionSelected : Click Sample Question
    AIInsights --> CustomQuestion : Type Custom Question
    
    QuestionSelected --> AIResponse : Process Question
    CustomQuestion --> AIResponse : Submit Question
    
    AIResponse --> AIInsights : Ask Another Question
    AIResponse --> Dashboard : Return to Dashboard
    
    ExpensesTab --> Dashboard : Navigate Back
    BudgetsTab --> Dashboard : Navigate Back
    
    note right of WelcomeScreen
        Shows sample data info
        20 expenses, 7 budgets
        AI advisor ready
    end note
    
    note right of AIResponse
        Personalized advice
        Based on user data
        Context-aware tips
    end note
```

## 7. Responsive Layout Diagram

```mermaid
graph TB
    subgraph "Desktop Layout (1200px+)"
        A1["Header: Logo + Full Navigation + Skip Tour"]
        A2["3-Column Grid: Stats + Charts + Quick Actions"]
        A3["AI Interface: Side-by-side Sample Questions & Input"]
        A4["Footer: Full Copyright Text"]
    end
    
    subgraph "Tablet Layout (768px-1199px)"
        B1["Header: Logo + Hamburger Menu"]
        B2["2-Column Grid: Stats + Charts Stacked"]
        B3["AI Interface: Stacked Sample Questions & Input"]
        B4["Footer: Condensed Text"]
    end
    
    subgraph "Mobile Layout (< 768px)"
        C1["Header: Logo + Hamburger Menu"]
        C2["Single Column: All Elements Stacked"]
        C3["AI Interface: Full Width, Vertical Stack"]
        C4["Footer: Minimal Text"]
    end
    
    style A1 fill:#2196f3,color:#fff
    style A2 fill:#4caf50,color:#fff
    style A3 fill:#ff9800,color:#fff
    style A4 fill:#607d8b,color:#fff
    
    style B1 fill:#2196f3,color:#fff
    style B2 fill:#4caf50,color:#fff
    style B3 fill:#ff9800,color:#fff
    style B4 fill:#607d8b,color:#fff
    
    style C1 fill:#2196f3,color:#fff
    style C2 fill:#4caf50,color:#fff
    style C3 fill:#ff9800,color:#fff
    style C4 fill:#607d8b,color:#fff
```

## 8. Data Flow Diagram

```mermaid
graph LR
    subgraph Frontend
        A[User Interface]
        B[JavaScript App]
        C[API Client]
    end
    
    subgraph Backend
        D[API Endpoints]
        E[Test Data Module]
        F[AI Integration]
    end
    
    subgraph External
        G[OpenAI API]
    end
    
    subgraph SampleData
        H[20 Sample Expenses]
        I[7 Sample Budgets]
        J[AI Sample Responses]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    D --> F
    F --> G
    G --> F
    E --> H
    E --> I
    E --> J
    
    D --> C
    C --> B
    B --> A
    
    style A fill:#e3f2fd
    style B fill:#e8f5e8
    style C fill:#fff3e0
    style D fill:#f3e5f5
    style E fill:#e0f2f1
    style F fill:#fce4ec
    style G fill:#fff8e1
    style H fill:#f0f4c3
    style I fill:#f0f4c3
    style J fill:#f0f4c3
```

## Usage Instructions for Excalidraw:

1. **Copy any of these Mermaid diagrams** into Excalidraw
2. **Use the Mermaid plugin** or convert to visual elements
3. **Focus on diagrams 1, 3, and 4** for your main wireframe needs
4. **Customize colors and styling** to match your app's design
5. **Add annotations** for specific UI elements and interactions

## Key Features Highlighted:
- ✅ New user onboarding flow
- ✅ AI advice getting process
- ✅ Sample data integration
- ✅ Interactive UI components
- ✅ Desktop-focused layout
- ✅ Low-fidelity wireframe style

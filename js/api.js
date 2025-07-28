
// ============================================================================
// JAVASCRIPT APPLICATION
// ============================================================================

/**
 * Fill the input with an example question
 */
function fillExample(text) {
    document.getElementById('user-input').value = text;
    document.getElementById('user-input').focus();
}

/**
 * Send user input to ChatGPT via our backend API
 */
async function sendToChatGPT() {
    // Get user input
    const userInput = document.getElementById('user-input').value.trim();
    const sendBtn = document.getElementById('send-btn');
    const responseDiv = document.getElementById('ai-response');

    // Validate input
    if (!userInput) {
        alert('Please enter a question first!');
        return;
    }

    try {
        // Update UI to show loading state
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending to ChatGPT...';
        responseDiv.innerHTML = '<div class="loading">🤖 ChatGPT is thinking...</div>';

        console.log('📤 Sending to ChatGPT:', userInput);

        // Make API call to our backend
        const response = await fetch('http://localhost:8000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userInput
            })
        });

        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response
        const data = await response.json();
        console.log('📥 Received from ChatGPT:', data);

        // Display the AI response
        displayResponse(data.response);

    } catch (error) {
        console.error('❌ Error:', error);
        
        // Show error message to user
        responseDiv.innerHTML = `
            <div class="error">
                <strong>Oops! Something went wrong:</strong><br>
                ${error.message}<br><br>
                <em>Make sure the backend server is running on http://localhost:8000</em>
            </div>
        `;
    } finally {
        // Reset button state
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send to ChatGPT';
    }
}

/**
 * Display the ChatGPT response in the UI
 */
function displayResponse(responseText) {
    const responseDiv = document.getElementById('ai-response');
    
    // Format the response text (preserve line breaks)
    const formattedText = responseText.replace(/\n/g, '<br>');
    
    responseDiv.innerHTML = `
        <div style="white-space: pre-line;">
            ${formattedText}
        </div>
    `;
}

/**
 * Allow Enter key to send message (with Shift+Enter for new lines)
 */
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendToChatGPT();
    }
});

// Initialize
console.log('✅ Simple ChatGPT App loaded and ready!');
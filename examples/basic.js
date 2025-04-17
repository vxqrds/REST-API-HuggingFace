
// Basic Conversational Flow

const Client = require('./client.js');

async function basicConversationFlow() {
    const client = new Client('https://api.example.com', 'your-api-key');

    // Step 1: Create a new conversation
    const conversationId = client.createConversation();
    console.log(`Created Conversation ID: ${conversationId}`);

    // Step 2: Insert a system prompt
    client.insertSystemPrompt('You are a helpful assistant.');

    // Step 3: Insert a user message
    client.insertUserMessage('Can you tell me the weather today?');

    // Step 4: Generate a response
    const response = await client.generate();
    console.log('Assistant Response:', response.content);
}

basicConversationFlow().catch(console.error);

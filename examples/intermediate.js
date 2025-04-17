
// Intermediate Conversational Management

const Client = require('./client.js');

async function multiConversationManagement() {
    const client = new Client('https://api.example.com', 'your-api-key');

    // Step 1: Create two conversations
    const firstConversationId = client.createConversation();
    console.log(`First Conversation ID: ${firstConversationId}`);
    const secondConversationId = client.createConversation();
    console.log(`Second Conversation ID: ${secondConversationId}`);

    // Step 2: Work with the first conversation
    client.selectConversation(firstConversationId);
    client.insertSystemPrompt('You are a friendly chatbot.');
    client.insertUserMessage('What is your name?');
    const firstResponse = await client.generate();
    console.log(`First Conversation Response: ${firstResponse.content}`);

    // Step 3: Switch to the second conversation
    client.selectConversation(secondConversationId);
    client.insertSystemPrompt('You are a technical assistant.');
    client.insertUserMessage('Explain the concept of recursion.');
    const secondResponse = await client.generate();
    console.log(`Second Conversation Response: ${secondResponse.content}`);
}

multiConversationManagement().catch(console.error);

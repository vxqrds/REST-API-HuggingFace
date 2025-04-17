
// Paramater Change

const Client = require('./client.js');

async function apiKeyMetadataAndUpdateParams() {
    const client = new Client('https://api.example.com', 'your-master-api-key');

    // Step 1: Fetch metadata for the API key
    const keyInfo = await client.getKeyInfo();
    console.log('API Key Metadata:', keyInfo);

    // Step 2: Update generation parameters
    const newParams = {
        temperature: 0.7,
        max_tokens: 150,
    };
    const updateResponse = await client.updateParams(newParams);
    console.log('Updated Generation Parameters Response:', updateResponse);

    // Step 3: Start a new conversation and generate a response with updated parameters
    const conversationId = client.createConversation();
    client.insertSystemPrompt('You are a knowledgeable assistant.');
    client.insertUserMessage('What are the latest advancements in AI?');
    const response = await client.generate();
    console.log('Assistant Response with New Parameters:', response.content);
}

apiKeyMetadataAndUpdateParams().catch(console.error);

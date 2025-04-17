const axios = require('axios');

class Client {
    constructor(apiBaseUrl, apiKey) {
        this.apiBaseUrl = apiBaseUrl;
        this.apiKey = apiKey;

        this.conversations = {}; // Stores conversations as { id: messages[] }
        this.selectedConversation = null; // Initially, no conversation is selected
    }

    /**
     * Set the Authorization header for API requests
     * @returns {Object} headers
     */
    getHeaders() {
        return {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
        };
    }

    /**
     * Create a conversation
     * @param {Number} id - Optional ID for the new conversation
     * @returns {Number} conversation ID.
     */
    createConversation(id = Object.keys(this.conversations).length + 1) {
        if (this.conversations[id]) {
            throw new Error(`Conversation with ID ${id} already exists.`);
        }

        this.conversations[id] = []; // Initialize a new conversation with an empty message array
        this.selectedConversation = id; // Automatically select the newly created conversation
        return id;
    }

    /**
     * Select an existing conversation by ID
     * @param {Number} id - ID of the conversation to select
     * @returns {void}
     */
    selectConversation(id) {
        if (!this.conversations[id]) {
            throw new Error(`Conversation with ID ${id} does not exist.`);
        }

        this.selectedConversation = id;
    }

    /**
     * Insert a system prompt.
     * @param {String} prompt - The system prompt to add
     * @returns {Number} Current conversation length
     */
    insertSystemPrompt(prompt) {
        if (!this.selectedConversation) {
            throw new Error('No conversation selected.');
        }

        return this.conversations[this.selectedConversation].push({
            role: 'system',
            content: prompt,
        });
    }

    /**
     * Insert a user message into the selected conversation
     * @param {String} message - The user's message
     * @returns {Number} Current conversation length
     */
    insertUserMessage(message) {
        if (!this.selectedConversation) {
            throw new Error('No conversation selected.');
        }

        return this.conversations[this.selectedConversation].push({
            role: 'user',
            content: message,
        });
    }

    /**
     * Insert an assistant message into the selected conversation
     * @param {String} message - The assistant's message
     * @returns {Number} Current conversation length
     */
    insertAssistantMessage(message) {
        if (!this.selectedConversation) {
            throw new Error('No conversation selected.');
        }

        return this.conversations[this.selectedConversation].push({
            role: 'assistant',
            content: message,
        });
    }

    /**
     * Generate a response based on the current conversation messages
     * @returns {Promise<Object>} - Response from the API
     */
    async generate() {
        if (!this.selectedConversation) {
            throw new Error('No conversation selected.');
        }

        const messages = this.conversations[this.selectedConversation];

        try {
            const response = await axios.post(
                `${this.apiBaseUrl}/generate`,
                { messages },
                { headers: this.getHeaders() }
            );

            // Automatically insert the assistant's response into the conversation
            this.insertAssistantMessage(response.data.content);

            return response.data;
        } catch (error) {
            console.error('Error generating response:', error.response?.data || error.message);
            throw error;
        }
    }

    /**
     * Fetch metadata for an API key
     * @returns {Promise<Object>} - Metadata for the API key
     */
    async getKeyInfo() {
        try {
            const response = await axios.get(`${this.apiBaseUrl}/key_info`, {
                headers: this.getHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching key info:', error.response?.data || error.message);
            throw error;
        }
    }

    /**
     * Update generation parameters (Requires Master Key)
     * @param {Object} params - Object with new generation parameters
     * @returns {Promise<Object>} - API response confirming the update
     */
    async updateParams(params) {
        try {
            const response = await axios.post(
                `${this.apiBaseUrl}/update_params`,
                params,
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating generation parameters:', error.response?.data || error.message);
            throw error;
        }
    }
}

module.exports = Client;

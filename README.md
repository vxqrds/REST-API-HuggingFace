# Basic Large Language Model AI REST API

## Overview

This repository includes:

1. **Client Library**: A JavaScript class for managing conversations and interacting with an AI-powered REST API.
2. **Flask Backend**: A Python-based API for generating responses using a transformer model.

---

## Client Library

### Features
- Create and manage conversations.
- Insert system, user, and assistant messages.
- Generate AI responses via the backend API.
- Fetch API key metadata and update model parameters.

---

## Flask Backend

### Features
- Generate AI responses based on input messages.
- Update generation parameters securely using a master API key.
- Track API key usage and IP addresses.

### Setup
1. Install Python dependencies with `pip install -r requirements.txt`.
2. Replace placeholders in the code (e.g., `MODEL_NAME` and `MASTER_KEY`).
3. Run the Flask app with `python app.py`.

The API will be accessible at `http://0.0.0.0:5000`.

---

Usage Limit has not been implemented, however if this project is actually used anywhere, I may consider it.

import os
import json

# Directory to store API key files
ALLOWED_KEYS_DIR = "./allowed"

# Ensure the directory exists
if not os.path.exists(ALLOWED_KEYS_DIR):
    os.makedirs(ALLOWED_KEYS_DIR)

def create_key():
    # Collect API key details from the user
    api_key = input("Enter the API Key: ").strip()
    if not api_key:
        print("API Key cannot be empty.")
        return

    owner_name = input("Enter the Owner's Name: ").strip()
    usage_limit = input("Enter the Usage Limit (leave blank for unlimited): ").strip()
    if usage_limit:
        try:
            usage_limit = int(usage_limit)
        except ValueError:
            print("Usage limit must be a number or left blank.")
            return
    else:
        usage_limit = None

    # Key metadata
    key_data = {
        "API Key": api_key,
        "Owner": owner_name,
        "Usage Limit": usage_limit,
        "Usage Times": 0,
        "IPs": []
    }

    # Save the key as a JSON file
    key_path = os.path.join(ALLOWED_KEYS_DIR, f"{api_key}.json")
    with open(key_path, 'w') as f:
        json.dump(key_data, f, indent=4)
    print(f"API key saved to {key_path}")

if __name__ == "__main__":
    create_key()

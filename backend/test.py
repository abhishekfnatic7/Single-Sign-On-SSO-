import requests

# Define the URL and the token
url = 'http://localhost:8000/api/authentication/google/'
token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlMzQ1ZmQ3ZTRhOTcyNzFkZmZhOTkxZjVhODkzY2QxNmI4ZTA4MjciLCJ0eXAiOiJKV1QifQ'  # Replace with an actual Google OAuth2 token

# Define the payload
payload = {
    'token': token
}

# Define the headers
headers = {
    'Content-Type': 'application/json'
}

# Make the POST request
response = requests.post(url, json=payload, headers=headers)

# Print out the response
print('Status Code:', response.status_code)
# print('Response JSON:', response.json())
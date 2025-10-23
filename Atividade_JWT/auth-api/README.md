# Auth API

## Overview
This project implements a secure and scalable authentication system for a REST API using JSON Web Tokens (JWT) and Refresh Tokens. The API is designed to support multiple clients, including web applications, mobile apps, and third-party services.

## Features
- User authentication with JWT
- Refresh token mechanism for session renewal
- Role-based access control (admin, user, moderator)
- Stateless design, ensuring no session storage on the server
- Secure token management and revocation

## Project Structure
```
auth-api
├── src
│   ├── server.ts               # Entry point of the application
│   ├── app.ts                  # Express application configuration
│   ├── config                   # Configuration settings
│   ├── controllers              # Controllers for handling requests
│   ├── routes                   # API routes
│   ├── middleware               # Middleware for authentication
│   ├── services                 # Business logic for authentication and user management
│   ├── repositories             # Functions for managing refresh tokens
│   ├── models                   # Data models
│   ├── utils                    # Utility functions for JWT
│   └── types                    # TypeScript types and interfaces
├── tests                        # Unit tests for the application
├── .env.example                 # Example environment variables
├── package.json                 # NPM configuration
├── tsconfig.json                # TypeScript configuration
├── jest.config.js              # Jest configuration
└── README.md                   # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd auth-api
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on the `.env.example` file and configure your environment variables.

## Usage
1. Start the server:
   ```
   npm start
   ```
2. Use the following endpoints for authentication:
   - **Login**: `POST /login` - Authenticate user and receive access and refresh tokens.
   - **Refresh Token**: `POST /refresh` - Renew access token using a valid refresh token.

## Security
- Ensure to run the application over HTTPS.
- Keep your secret keys secure and do not expose sensitive information in tokens.

## Testing
Run the tests using:
```
npm test
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
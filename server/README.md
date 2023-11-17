# Leaf Auth

The Authenticati

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [User Authentication](#user-authentication)
  - [Refresh Access Token](#refresh-token)
  - [User Profile](#user-profile)
  - [Update User](#update-user)
  - [Update Password](#update-password)
  - [Protected Routes](#protected-routes)
- [Contributing](#contributing)
- [License](#license)

## Introduction


## Installation

Provide instructions on how to install and set up the project. Include any dependencies that need to be installed and how to configure them.

```bash
# Clone the repository
git clone https://github.com/your-username/your-repository.git

# Change directory
cd your-repository

# Install dependencies
pnpm install
```

## Usage

Explain how to use your project, any important considerations, and provide examples if necessary.

```bash
# Start the server
pnpm start
```

## Endpoints

### User Authentication

#### Register User

- **Endpoint:** `POST /api/v1/register`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login User

- **Endpoint:** `POST /api/v1/login`
- **Description:** Authenticate a user and generate access and refresh tokens.
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "your_access_token",
    "refreshToken": "your_refresh_token"
  }
  ```

#### Logout User

- **Endpoint:** `POST /api/v1/logout`
- **Description:** Log out a user and invalidate the access token.
- **Request Header:**
  ```
  Authorization: Bearer your_access_token
  ```
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Refresh Tokens
- **Endpoint:** `POST /api/v1/rerfresh-token
- - **Description:** Refresh the access token using refresh token.
- **Request Header:**
   ```
  Authorization: Bearer your_access_token
  ```
### Body Parameters

- `refreshToken` (string, required): The refresh token obtained during the initial authentication.

- **Request Body:**
  ```json
  {
     "refreshToken": "your_refresh_token_here"
  }
  ```
  - **Response:**
  ```json
  {
     "accessToken": "new_access_token_here"
  }
  ```

### User Profile

#### Add Profile
- **Endpoint:** `POST /api/v1/profile`
- **Description:** Add user information.
- **Request Header:**
  ```
  Authorization: Bearer your_access_token
  ```
- **Request Body:**
  ```json
  {
    "phoneNumber": "9876543210",
    "location": "New City, New Country"
  }
  ```
  - **Response:**
  ```json
  {
    "message": "User profile successfully"
  }
  ```
  

#### Update User

- **Endpoint:** `PUT /api/v1/update_user`
- **Description:** Update user information.
- **Request Header:**
  ```
  Authorization: Bearer your_access_token
  ```
- **Request Body:**
  ```json
  {
    "name": "New Name",
    "email": "new.email@example.com",
    "phoneNumber": "9876543210",
    "location": "New City, New Country"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User updated successfully",
    "user": {
      "name": "New Name",
      "email": "new.email@example.com",
      "phoneNumber": "9876543210",
      "location": "New City, New Country"
    }
  }
  ```

#### Update Password

- **Endpoint:** `PUT /api/v1/update_password`
- **Description:** Update user password.
- **Request Header:**
  ```
  Authorization: Bearer your_access_token
  ```
- **Request Body:**
  ```json
  {
    "currentPassword": "old_password",
    "newPassword": "new_password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Password updated successfully"
  }
  ```

### Protected Routes

#### Get Protected Route

- **Endpoint:** `GET /api/v1/protected`
- **Description:** Access a protected route.
- **Request Header:**
  ```
  Authorization: Bearer your_access_token
  ```
- **Response:**
  ```json
  {
    "message": "You have access to this protected route",
    "user": {
      "name": "User Name",
      "username": "user_username",
      "email": "user.email@example.com",
      "phoneNumber": "1234567890",
      "location": "City, Country"
    }
  }
  ```

#### Get Profile Route

- **Endpoint:** `GET /api/v1/protected/profile`
- **Description:** Access the user profile route.
- **Request Header:**
  ```
  Authorization: Bearer your_access_token
  ```
- **Response:**
  ```json
  {
    "message": "This is the user profile page",
    "user": {
      "name": "User Name",
      "username": "user_username",
      "email": "user.email@example.com",
      "phoneNumber": "1234567890",
      "location": "City, Country"
    }
  }
  ```


## License

This project is licensed under the [MIT](LICENSE.md) License - see the [LICENSE.md](LICENSE.md) file for details.

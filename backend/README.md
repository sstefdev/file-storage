# File Storage Backend

This project is a file storage backend service built with Express.js and Sequelize for SQLite. It allows users to register, log in, upload files with metadata, and list their uploaded files.

## Features

- User registration and authentication
- File upload with metadata
- Listing uploaded files
- Simple authentication mechanism
- Basic logging with Winston
- Unit tests and E2E tests
- Swagger API documentation

## Technologies Used

- Express.js
- Sequelize ORM
- SQLite
- Multer for file uploads
- Bcrypt.js for password hashing
- JSON Web Token for authentication
- Winston for logging
- Jest and Supertest for testing

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/sstefdev/file-storage-app.git
   cd file-storage-app/backend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   JWT_SECRET=your_secret_key
   ```

### Running the Server

To start the server, use one of the following commands:

#### Development

```bash
npm run dev
```

#### Production

```bash
npm run start
```

#### Running Tests

To run the tests, use the following command:

```bash
npm test
```

### API Documentation

The API documentation is available via Swagger.

Start the server
Open your browser and navigate to http://localhost:5000/api-docs

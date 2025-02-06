# Gym Management Backend

This project is a backend system for managing a gym. It provides APIs for handling memberships, classes, trainers, and other gym-related activities.

## Features

- User authentication and authorization
- Membership management
- Class scheduling and booking
- Trainer management
- Payment processing

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Stripe for payment processing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gym_management_backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd gym_management_backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

## Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

2. The server will be running at `http://localhost:3000`.

## API Documentation

For detailed API documentation, refer to the [API Docs](./docs/api.md).

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

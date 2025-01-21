# Football Match Tracker

A simple web application for tracking football matches. This project is built using **Express.js** and **Mongoose** to provide a seamless way to manage football match data.

## Features

- **Match Management**: Add, update, delete, and view football matches.
- **Database Integration**: Uses MongoDB with Mongoose for efficient data management.
- **Scalable Architecture**: Suitable for leagues, tournaments, or personal match tracking.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Dephan271/simple-football-match-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd football-match-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000` (or the specified port in your `.env` file).
- Use the API endpoints to manage match data.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

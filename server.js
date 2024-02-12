// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// Create an Express application
const app = express();
const port = 3000;

// Use middleware to parse JSON in request bodies
app.use(bodyParser.json());

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: '62.72.33.157',
  database: 'bobdev',
  password: 'IlRssVm22!RaK4L',
  port: 5432,
});

// Define an endpoint for user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash the user's password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert the user's information into the database
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    
    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle errors, such as duplicate username (violating unique constraint)
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define an endpoint for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve the user's information from the database based on the username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    // Check if the username exists
    if (result.rows.length === 0) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    // Retrieve the hashed password from the database
    const hashedPassword = result.rows[0].password;

    // Compare the hashed password with the provided password using bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    // Respond based on the comparison result
    if (isPasswordCorrect) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

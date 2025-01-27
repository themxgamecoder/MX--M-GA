const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const express = require('express');
const { handleStart, handleUserInput } = require('./mxgamecoder/UltraMX_bot.js'); // Import functions
require('dotenv').config();

// Connect to MongoDB
const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Create a new bot instance with polling
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Create an Express app to manage the port
const app = express();

// Serve a simple route to ensure the server is running
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Get the port from the environment or default to 3000
const port = process.env.PORT || 3000;

// Start the Express server
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

// Handle user input (username and PIN)
bot.on('message', async (msg) => {
  await handleUserInput(bot, msg); // Use handleUserInput from UltraMX_bot.js
});

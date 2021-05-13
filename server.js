// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Allows express to access files in public folder
app.use(express.static('public'))

// List of notes
const notes = [
  {
    title: 'yoda',
    text: 'he was green',
  },
];

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '\\public\\index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '\\public\\notes.html')));

// Displays all notes on file
app.get('/api/notes', (req, res) => res.json(notes));


// Create New Notes - takes in JSON input
app.post('/api/notes', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNotes = req.body;

  // Using a RegEx Pattern to remove spaces from newNotes
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newNotes.routeName = newNotes.name.replace(/\s+/g, '').toLowerCase();
  console.log(newNotes);

  notes.push(newNotes);
  res.json(newNotes);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

// Publish on heroku
// heroku create projectName
// git push heroku master

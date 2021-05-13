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
let notes = [
  {
    title: 'Example',
    text: 'The most important step a man can take is the first one.',
    id: 1,
  },
];

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// Displays all notes on file
app.get('/api/notes', (req, res) => res.json(notes));

// Default route
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));


// Create New Notes - takes in JSON input
app.post('/api/notes', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNotes = req.body;

  // Using a RegEx Pattern to remove spaces from newNotes
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newNotes.routeName = newNotes.name.replace(/\s+/g, '').toLowerCase();
  console.log(newNotes);

  newNotes.id = Date.now();
  notes.push(newNotes);
  res.json(newNotes);
});

// Delete Notes
app.delete('/api/notes/:id', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const delNote = req.body;

    const noteID = parseInt(req.params.id);
  
    // Using a RegEx Pattern to remove spaces from newNotes
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newNotes.routeName = newNotes.name.replace(/\s+/g, '').toLowerCase();
    console.log(noteID);
  
    console.log('Notes before');
    notes.forEach(not => console.log(not));

    if (notes.length){
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === noteID) {
                notes.splice(i, 1);
            }
        }
    }

    console.log('Notes after');
    notes.forEach(not => console.log(not));

    
    res.json(delNote);
  });

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

// Publish on heroku
// heroku create projectName
// git push heroku master

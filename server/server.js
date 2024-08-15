const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find(note => note.id === req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

app.post('/api/notes', (req, res) => {
  const newNote = {
    id: Date.now().toString(),
    title: req.body.title,
    body: req.body.body,
    createdAt: new Date()
  };
  notes.push(newNote);
  res.json(newNote);
});

app.put('/api/notes/:id', (req, res) => {
  const note = notes.find(note => note.id === req.params.id);
  if (note) {
    note.title = req.body.title;
    note.body = req.body.body;
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== req.params.id);
  res.json({ message: 'Note deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, Heading, Stack } from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);  // Assuming you're setting the data in state
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setBody(note.body);
    setIsEditing(true);
  };

  const handleNoteSave = async () => {
    if (isEditing) {
      await axios.put(`http://localhost:5000/api/notes/${selectedNote.id}`, { title, body });
    } else {
      await axios.post('http://localhost:5000/api/notes', { title, body });
    }
    setIsEditing(false);
    setTitle('');
    setBody('');
    fetchNotes();
  };

  const handleNoteDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Notes App</Heading>

      <Stack spacing={4} direction="row">
        <Box w="40%">
          <Heading size="md" mb={4}>Notes List</Heading>
          {notes.length === 0 ? (
            <p>No notes available</p>
          ) : (
            notes.map((note) => (
              <Box key={note.id} border="1px" p={3} mb={3}>
                <Heading size="sm">{note.title}</Heading>
                <p>{note.body}</p>
                <Button size="sm" colorScheme="teal" mt={2} onClick={() => handleNoteSelect(note)}>Edit</Button>
                <Button size="sm" colorScheme="red" mt={2} ml={2} onClick={() => handleNoteDelete(note.id)}>Delete</Button>
              </Box>
            ))
          )}
        </Box>

        <Box w="60%">
          <Heading size="md" mb={4}>{isEditing ? 'Edit Note' : 'New Note'}</Heading>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb={3}
          />
          <Textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            mb={3}
          />
          <Button colorScheme="teal" onClick={handleNoteSave}>
            {isEditing ? 'Update Note' : 'Save Note'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default App;

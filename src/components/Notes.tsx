import React, { useState, useEffect } from 'react';

interface Client {
  id: string;
  givenName: string;
  familyName: string;
}

interface NotesProps {
  client: Client | null;
}

const Notes: React.FC<NotesProps> = ({ client }) => {
  const [inputNotes, setInputNotes] = useState('');

  useEffect(() => {
    if (client) {
      console.log(`notesClient: ${client.id}`)
    } else {
      setInputNotes('');
    }
  }, [client]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputNotes(event.target.value);
  };

  const handleSaveNotes = () => {
    if (client) {
      console.log(`notes saved: ${inputNotes}`)
    }
  };

  return (
    <div>
      <h2>Client Notes</h2>
      {client ? (
        <div>
          <p>Client: {client.givenName} {client.familyName}</p>
          <p>{client.id}</p>
          <textarea
            rows={5}
            cols={50}
            value={inputNotes}
            onChange={handleChange}
            placeholder="Enter notes here..."
          />
          <button onClick={handleSaveNotes}>Save Notes</button>
        </div>
      ) : (
        <p>Select a client to view notes</p>
      )}
    </div>
  );
};

export default Notes;

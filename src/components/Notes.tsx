import React, { useState, useEffect } from 'react';

interface Client {
  id: number;
  givenName: string;
  familyName: string;
  notes: string;
}

interface NotesProps {
  client: Client | null;
  onSaveNotes: (clientId: number, notes: string) => void;
  savedNotes: string;
}

const Notes: React.FC<NotesProps> = ({ client, onSaveNotes }) => {
  const [inputNotes, setInputNotes] = useState('');

  useEffect(() => {
    if (client) {
      setInputNotes(client.notes);
      console.log(client.notes)
    } else {
      setInputNotes('');
    }
  }, [client]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputNotes(event.target.value);
  };

  const handleSaveNotes = () => {
    if (client) {
      onSaveNotes(client.id, inputNotes);
    }
  };

  return (
    <div>
      <h2>Client Notes</h2>
      {client ? (
        <div>
          <p>Client: {client.givenName} {client.familyName}</p>
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

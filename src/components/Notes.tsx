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
  const [prevNotes, setPrevNotes] = useState('');

  useEffect(() => {
    if (client) {
      setPrevNotes(localStorage.getItem(client.id)|| '')
      setInputNotes('');
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
      localStorage.setItem(client.id, inputNotes)
      setPrevNotes(inputNotes)
      setInputNotes('')
    }
  };

  return (
    <div>
      {/* <h2>Client Notes</h2> */}
      {client ? (
        <div>
          <h2 className='text-xl'>{client.givenName} {client.familyName}</h2>
          <p>Recent notes: "{prevNotes}"</p>
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

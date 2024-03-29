import React, { useState } from 'react';
import Table from '@/components/Table';
import Notes from '@/components/Notes'; // Assuming you have a Notes component

interface ClientNotesProps {
  clients: Client[];
}

const ClientNotes: React.FC<ClientNotesProps> = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [notesMap, setNotesMap] = useState<{ [clientId: number]: string }>({});

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
  };

  const handleSaveNotes = (notes: string) => {
    if (selectedClient) {
      setNotesMap(prevNotes => ({
        ...prevNotes,
        [selectedClient.id]: notes
      }));
    }
  };

  return (
    <div className="flex">
      <div className="overflow-x-auto w-1/2">
        <Table clients={clients} onClientClick={handleClientClick} />
      </div>
      <div className="w-1/2">
        <Notes client={selectedClient} onSaveNotes={handleSaveNotes} savedNotes={notesMap[selectedClient?.id || -1]} />
      </div>
    </div>
  );
};

export default ClientNotes;

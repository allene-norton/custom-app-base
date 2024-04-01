import React, { useState } from 'react';
import Table from '@/components/Table';
import Notes from '@/components/Notes'; 

interface Client {
  id: string;
  givenName: string;
  familyName: string;
  notes: string;
}

interface ClientNotesProps {
  clients: Client[];
}

const ClientNotes: React.FC<ClientNotesProps> = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
  };



  return (
    <div className="flex">
      <div className="overflow-x-auto w-1/2">
        <Table clients={clients} onClientClick={handleClientClick} />
      </div>
      <div className="w-1/2">
        <Notes client={selectedClient} />
      </div>
    </div>
  );
};

export default ClientNotes;

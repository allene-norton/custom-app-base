import React from 'react';

interface Client {
  id: string;
  givenName: string;
  familyName: string;
}

interface TableProps {
  clients: Client[];
  onClientClick: (client: Client) => void;
}

const Table: React.FC<TableProps> = ({ clients, onClientClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client, index) => (
            <tr key={index} className="cursor-pointer" onClick={() => onClientClick(client)}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {client.givenName} {client.familyName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

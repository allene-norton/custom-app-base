"use client"
import React from 'react';
import ClientNotes from '@/components/ClientNotes';



const Dashboard: React.FC<DashboardProps> = ({ clients }) => {
  return (
    <div className="overflow-x-auto">
      <ClientNotes clients={clients}/>
    </div>
  );
};

export default Dashboard;

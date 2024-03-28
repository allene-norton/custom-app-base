import React, { useState } from 'react';
import { copilotApi } from 'copilot-node-sdk';
import { need } from '@/utils/need';

const API_KEY = need<string>(process.env.COPILOT_API_KEY);

async function clientData(searchParams: SearchParams) {
  const copilot = copilotApi({
    apiKey: API_KEY,
    token:
      'token' in searchParams && typeof searchParams.token === 'string'
        ? searchParams.token
        : undefined,
  });

  // copilot.updateClient({id, requestBody,}: {id: string; request})
}


interface FormData {
  inputValue: string;
}

const SimpleForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    inputValue: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Do something with the form data, for example submit it to a backend
    console.log('Form submitted with data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Input:
        <input 
          type="text"
          name="inputValue"
          value={formData.inputValue}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleForm;
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'; // Importa el componente Form de 'react-bootstrap/Form'
import DangerBar from './DangerBar';

const DangerInput = () => {
  const [value, setValue] = useState(0);

  const handleChangle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <>
      <div className='m-3 w-50'>
        <h2>Ejemplo</h2>
        <Form.Range value={value} onChange={handleChangle} /> {/* Utiliza Form.Range */}
        <DangerBar value={value} />
      </div>
    </>
  );
};

export default DangerInput;

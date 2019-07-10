import React, { useState, useEffect } from 'react';
import Proche from './Proche';
import Data from '../Data/Data';

const Formulaire = () => {

  const [proche, setProche] = useState();
  const [patient, setPatient] = useState();

  useEffect(() => {
    Data((result) => {
      setProche(result[0]);
      setPatient(result[1]);
    })
  }, []);

  return (

    <div>
      <Proche data={proche} />
    </div>
  )
};

export default Formulaire;

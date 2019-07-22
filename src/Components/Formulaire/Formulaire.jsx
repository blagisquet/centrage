import React, { useState, useEffect } from 'react';
import Proche from './Proche';
import Data from '../Data/Data';

const Formulaire = () => {
  const [proche, setProche] = useState();

  useEffect(() => {
    Data((result) => {
      setProche(result[0]);
    });
  }, []);

  if (!proche || proche === undefined) {
    return <div className="loadingDiv"> Loading ...</div>;
  }

  return (
    <div>
      <Proche data={proche} />
    </div>
  );
};

export default Formulaire;

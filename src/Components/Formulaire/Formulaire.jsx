import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Proche from './Proche';
import Data from '../Data/Data';

const Formulaire = () => {
  const [proche, setProche] = useState();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Data((result) => {
      setProche(result[0]);
    });
  }, []);

  const renderRedirect = () => {
    if (redirect) {
      return (
        <div>
          <Redirect to="/formulaire/page2" />
        </div>
      );
    }
    return null;
  };

  if (!proche || proche === undefined) {
    return <div className="loadingDiv"> Loading ...</div>;
  }

  return (
    <div>
      {renderRedirect()}
      <Proche data={proche} />
      <div>
        <button type="button" onClick={() => setRedirect(true)}>passez a la prochaine categorie</button>
      </div>
    </div>
  );
};

export default Formulaire;

import React from 'react';
import './Homepage.css';

function Homepage() {
  return (
    <div className="home">
      <p>Bonjour Olivier, que souhaitez-vous faire?</p>
      <button type="button" className="btn btn-primary">Aller vers les RDV</button>
      <button type="button" className="btn btn-primary">Aller vers les patients</button>
    </div>
  );
}

export default Homepage;

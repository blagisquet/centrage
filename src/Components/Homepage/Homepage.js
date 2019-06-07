import React from 'react';
import './Homepage.css';

function Homepage() {
  return (
    <div>
      <div className="container">
        <div className="home">
          <p>Bonjour Olivier, que souhaitez-vous faire?</p>
        </div>
      </div>
      <div className="container">
        <div className="button-home">
          <button type="button" className="btn btn-primary d-flex">Aller vers les RDV</button>
          <button type="button" className="btn btn-primary d-flex ">Aller vers les patients</button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

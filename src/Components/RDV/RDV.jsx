import React, { useState, useEffect } from 'react';
import './RDV.css';
import axios from 'axios';
import _ from 'underscore';
import url from '../Data/config';

function RDV() {
  const [rdv, setRdv] = useState([]);
  const [filterLastname, setFilterLastname] = useState([false]);
  const [filterHours, setFilterHours] = useState([false]);

  useEffect(() => {
    axios.get(`${url}/patients/rdv`)
      .then((result) => {
        setRdv(result.data);
      });
  }, []);

  const filterRdv = (tag, [setFunc, param]) => {
    if (param) {
      setRdv(_.sortBy(rdv, tag).reverse());
    } else {
      setRdv(_.sortBy(rdv, tag).reverse());
    }
    setFunc(!param);
  };

  return (
    <div className="tableStyle">
      <h1>Rendez-vous</h1>
      <table className="rdv-style table table-hover table-bordered">
        <thead>
          <tr>
            <th onClick={() => filterRdv('lastname', [setFilterLastname, filterLastname])} scope="col">Nom du client</th>
            <th scope="col">Prénom du client</th>
            <th scope="col">Lien personne de confiance</th>
            <th onClick={() => filterRdv('lastname', [setFilterLastname, filterLastname])} scope="col">Nom du proche</th>
            <th scope="col">Prénom du proche</th>
            <th scope="col">Téléphone</th>
            <th onClick={() => filterRdv('hours', [setFilterHours, filterHours])} scope="col">Horaires d&apos;appel</th>
          </tr>
        </thead>
        <tbody>
          {rdv.map((rendez, index) => (
            <tr key={[index]}>
              <th scope="row">{rendez.lastName}</th>
              <td>{rendez.name}</td>
              <td>{rendez.relativePerson.relationship}</td>
              <td>{rendez.relativePerson.lastName}</td>
              <td>{rendez.relativePerson.name}</td>
              <td>{rendez.relativePerson.phone}</td>
              <td>{rendez.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RDV;

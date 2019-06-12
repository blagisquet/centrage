import React, { useState, useEffect } from 'react';
import './RDV.css';
import axios from 'axios';
import _ from 'underscore';


function RDV() {
  const [rdv, setRdv] = useState([]);
  const [filterLastname, setFilterLastname] = useState([false]);
  const [filterHours, setFilterHours] = useState([false]);

  useEffect(() => {
    axios.get('http://192.168.8.158:8000/rdv')
      .then((result) => {
        setRdv(result.data);
      });
  }, []);

  const filterRdv = (tag, [setFunc, param]) => {
    if (param) {
      setRdv(_.sortBy(rdv, tag).reverse());
    } else {
      setRdv(_.sortBy(rdv, tag));
    }
    setFunc(!param);
  };

  return (
    <div className="tableStyle">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Nom du client</th>
            <th scope="col">Prénom du client</th>
            <th scope="col">Lien personne de confiance</th>
            <th scope="col">Nom du proche</th>
            <th scope="col">Prénom du proche</th>
            <th scope="col">Téléphone</th>
            <th scope="col">Horaires d&apos;appel</th>
          </tr>
        </thead>
        <tbody>
          {rdv.map((rdv, index) => {
            return (
              <tr key={[index]}>
                <td onClick={() => filterRdv('lastname', [setFilterLastname, filterLastname])}>{rdv.lastName}</td>
                <td>{rdv.name}</td>
                <td>{rdv.relativePerson.relationship}</td>
                <td onClick={() => filterRdv('lastname', [setFilterLastname, filterLastname])}>{rdv.relativePerson.lastName}</td>
                <td>{rdv.relativePerson.name}</td>
                <td>{rdv.relativePerson.phone}</td>
                <td onClick={() => filterRdv('hours', [setFilterHours, filterHours])}>{rdv.hours}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RDV;

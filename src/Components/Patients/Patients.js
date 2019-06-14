import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'underscore';
import './Patients.css';

function Patients() {

  const [clients, setClients] = useState([]);
  const [mailArray, setMailArray] = useState([]);
  const [filterName, setFilterName] = useState(false);
  const [filterGIR, setFilterGIR] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get('http://192.168.8.158:8000/patient')
      .then((result) => {
        setClients(result.data);
      })
  }, []);

  const nameArray = (mail) => {
    if (mailArray.indexOf(mail) === -1) {
      setMailArray([...mailArray, mail]);
    } else {
      const newEmail = [...mailArray];
      newEmail.splice(newEmail.indexOf(mail), 1)
      setMailArray(newEmail);
    }
  };

  const filterNames = (tag, [setFunc, param]) => {
    if (param) {
      setClients(clients.reverse());
    } else {
      setClients(_.sortBy(clients, tag));
    }
    setFunc(!param);
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/client' />
    }
  }

  return (
    <div className="container-fluid">
      <div className="tableStyle">
        {renderRedirect()}
        {
          mailArray.length ?
            <button type="button" className="btn btn-primary btn-lg btn-block">envoyer email</button>
            :
            <button type="button" className="btn btn-light btn-lg btn-block" disabled>envoyer email</button>
        }

        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Prénom</th>
              <th onClick={() => filterNames('name', [setFilterName, filterName])} scope="col">Nom</th>
              <th scope="col">Statut</th>
              <th onClick={() => filterNames('GIR', [setFilterGIR, filterGIR])} scope="col">GIR</th>
              <th scope="col">Zone géographique</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          {clients.length ?
            <tbody>
              {clients.map((client, index) => (
                <tr key={index} >
                  <td >{client.name}</td>
                  <td onClick={() => setRedirect(true)}>{client.lastName}</td>
                  <td >Statut</td>
                  <td >GIR</td>
                  <td >{client.postalCode}</td>
                  <td >
                    <input type="checkbox" onChange={() => nameArray(client.relativePerson.mail)} name="email" />
                  </td>
                </tr>
              ))
              }
            </tbody>
            :
            <tbody>
              <tr>
                <td>loading prenoms</td>
                <td>loading noms</td>
                <td>loading statuses</td>
                <td>loading GIRs</td>
                <td>loading zones</td>
                <td>loading mails</td>
              </tr>
            </tbody>}
        </table>
      </div>

    </div>
  );
}

export default Patients;

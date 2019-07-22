import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'underscore';
import url from '../Data/config';
import './Patients.css';

function Patients() {
  const [clients, setClients] = useState([]);
  const [mailArray, setMailArray] = useState([]);
  const [filterName, setFilterName] = useState(false);
  const [filterGIR, setFilterGIR] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState(0);
  const [a, setA] = useState(false);
  const [mail, setMail] = useState('');

  const dataSend = {
    email: mail,
    listEmail: mailArray,
  };

  useEffect(() => {
    axios.get(`${url}/patients`)
      .then((result) => {
        setClients(result.data);
      });
  }, []);

  const subMit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', dataSend.email);
    data.append('listEmail', dataSend.listEmail);

    axios.post(`${url}/patients/email`, data)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    setMail('');
    setMailArray([]);
    setTimeout(window.location.reload.bind(window.location), 500);
  };

  const nameArray = (email) => {
    if (mailArray.indexOf(email) === -1) {
      setMailArray([...mailArray, email]);
    } else {
      const newEmail = [...mailArray];
      newEmail.splice(newEmail.indexOf(email), 1);
      setMailArray(newEmail);
    }
  };

  const girFilter = ([setFunc, param]) => {
    if (param) {
      const filteredDesc = clients.sort((a1, b1) => b1.datas[0].response - a1.datas[0].response);
      setClients(filteredDesc);
    } else {
      const filteredAsc = clients.sort((a2, b2) => a2.datas[0].response - b2.datas[0].response);
      setClients(filteredAsc);
    }
    setFunc(!param);
  };

  const filterClients = (tag, [setFunc, param]) => {
    if (param) {
      setClients(clients.reverse());
    } else {
      setClients(_.sortBy(clients, tag));
    }
    setFunc(!param);
  };

  const changeTrue = (setHook) => {
    setHook(true);
  };

  const changeFalse = (setHook) => {
    setHook(false);
  };

  const renderRedirect = () => {
    if (redirect) {
      return (
        <div>
          <Redirect to={`/client/${id}`} />
        </div>
      );
    }
    return null;
  };

  if (!clients.length) {
    return <div className="loadingDiv"> Loading ...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="tableStyle">
        <h1>Clients</h1>
        {renderRedirect()}
        {mailArray.length
          ? (
            <button
              type="button"
              onClick={
                a ? (e) => {
                  subMit(e);
                  changeFalse(setA);
                } : () => {
                  changeTrue(setA);
                }}
              className="btn btn-primary btn-lg btn-block"
            >
              envoyer email
            </button>
          ) : <button type="button" className="btn btn-light btn-lg btn-block" disabled>envoyer email</button>}
        {(a && mailArray.length)
          ? (
            <div className="mt-3">
              <strong>Vers quelle adresse ?</strong>
              <input
                style={{ border: 'none' }}
                className="label-content ml-1 w-100 mb-3"
                type="text"
                id="mail"
                name="mail"
                onChange={event => setMail(event.target.value)}
                value={mail}
                placeholder={"saisissez l'adresse"}
              />
            </div>
          ) : <div />}
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col"><button type="button" onClick={() => filterClients('name', [setFilterName, filterName])}>Nom</button></th>
              <th scope="col">Prénom</th>
              <th scope="col">Statut</th>
              <th scope="col"><button type="button" className="buttonGir" onClick={() => girFilter([setFilterGIR, filterGIR])}> GIR</button></th>
              <th scope="col">Zone géographique</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={[index]}>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      setRedirect(true);
                      setId(client.id);
                    }}
                  >
                    {client.lastName}
                  </button>
                </td>
                <td>{client.name}</td>
                <td>Statut</td>
                <td>{!client.datas.length ? 'undefined' : client.datas[0].response}</td>
                <td>{client.city}</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => {
                      nameArray(client.relativePerson.mail);
                    }}
                    name="email"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patients;

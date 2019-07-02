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
  const [id, setId] = useState(0);

  useEffect(() => {
    axios.get('http://192.168.184.172:8001/patients')
      .then((result) => {
        setClients(result.data);
      });
  }, []);

  //console.log(clients);
  //console.log(mailArray);

  const nameArray = (mail) => {
    if (mailArray.indexOf(mail) === -1) {
      setMailArray([...mailArray, mail]);
    } else {
      const newEmail = [...mailArray];
      newEmail.splice(newEmail.indexOf(mail), 1);
      setMailArray(newEmail);
    }
  };

  const girFilter = ([setFunc, param]) => {
    if (param) {
      let filteredDesc = clients.sort((a, b) => b.datas[0].response - a.datas[0].response);
      setClients(filteredDesc);
    } else {
      let filteredAsc = clients.sort((a, b) => a.datas[0].response - b.datas[0].response);
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

  const renderRedirect = () => {
    if (redirect) {
      return (
        <div>
          <Redirect to={`/client/:${id}`} />
        </div>
      );
    }
    return null;
  };

  if (!clients.length) {
    return <div className='loadingDiv'> Loading ...</div>
  }

  return (
    <div className="container-fluid">
      <div className="tableStyle">
        {renderRedirect()}
        {mailArray.length ? <button type="button" className="btn btn-primary btn-lg btn-block">envoyer email</button> : <button type="button" className="btn btn-light btn-lg btn-block" disabled>envoyer email</button>}
        < table className="table table-hover table-bordered">
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
                  <button type="button" onClick={() => {
                    setRedirect(true)
                    setId(client.id)
                  }}>
                    {client.lastName}
                  </button>
                </td>
                <td>{client.name}</td>
                <td>Statut</td>
                <td>{client.datas[0].response}</td>
                <td>{client.city}</td>
                <td>
                  <input type="checkbox" onChange={() => nameArray(client.relativePerson.mail)} name="email" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default Patients;

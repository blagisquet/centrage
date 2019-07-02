import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Patient.css';

function Patient(props) {
  const client = parseFloat(props.match.params.id.slice(1));
  const [name, setName] = useState();
  const [proche, setProche] = useState();
  const [confiance, setConfiance] = useState();
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const [d, setD] = useState(false);
  const [rue, setRue] = useState();
  const [code, setCode] = useState();
  const [city, setCity] = useState();

  const dataSend = {
    address: rue === '' ? name.address : rue,
    postalCode: code === '' ? name.postalCode : parseFloat(code),
  };

  useEffect(() => {
    axios.get(`http://192.168.184.172:8001/patients/${client}`)
      .then((result) => {
        setName(result.data);
        setProche(result.data.relativePerson);
        setConfiance(result.data.trustedPerson);
        setRue(result.data.address === undefined ? '' : result.data.address);
        setCode(result.data.postalCode);
        setCity(result.data.city);
      });
  }, [client]);

  const subMit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('address', dataSend.address);
    data.append('postalCode', dataSend.postalCode);
    //first method for FormData()
    // for (let pair of data.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }
    //second method for FormData()
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    // console.log(data);

    axios.post(`http://192.168.184.172:8001/patients/update/${client}`, data
      // ,
      //   {
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //     }
      //   }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const changeTrue = (setHook) => {
    setHook(true);
  };

  const changeFalse = (setHook) => {
    setHook(false);
  };

  const capitalize = (string) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  if (!name || !proche || !confiance) {
    return <div className='loadingDiv'> Loading ...</div>
  };

  return (
    <div className="container-fluid">
      <div className="cardDisplay row">
        <div className=" col-12 mb-5"><strong>{capitalize(name.name)} {capitalize(name.lastName)}</strong></div>
        <div className="col-sm-12 mb-3">
          <div className="card">
            <div className="card-header">
              Informations sur client
            </div>
            <div className="card-body">

              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">Adresse du client: Rue</span>
                    {a ? <input
                      className="label-content"
                      type="text"
                      id="rue"
                      name="rue"
                      onChange={(event) => setRue(event.target.value)}
                      value={rue}
                      placeholder={'nom de rue'} /> :
                      <span id="consumption-address" className="label-content">{name.address}</span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button className={`btn float-right btn-sm ml-3 ${a ? "btn-success" : "btn-primary"}`}
                    onClick={a ? (e) => {
                      subMit(e);
                      setA(false);
                    }
                      :
                      () => changeTrue(setA)}>{a ? 'Send' : 'Edit'}</button>
                  {a ? <button className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setA)}>Cancel</button> : <div />}
                </div>
              </div>

              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">Adresse du client: Code</span>
                    {b ? <input
                      className="label-content"
                      type="text"
                      id="code"
                      name="code"
                      onChange={(event) => setCode(event.target.value)}
                      value={code}
                      placeholder={'code postal'} /> :
                      <span id="consumption-address" className="label-content"> {name.postalCode} </span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button className={`btn float-right btn-sm ml-3 ${b ? "btn-success" : "btn-primary"}`} onClick={b ? (e) => {
                    subMit(e);
                    setB(false);
                  }
                    :
                    () => changeTrue(setB)}>{b ? 'Send' : 'Edit'}</button>
                  {b ? <button className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setB)}>Cancel</button> : <div />}
                </div>
              </div>

              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">Adresse du client: Ville</span>
                    {c ? <input
                      className="label-content"
                      type="text"
                      id="name"
                      name="name"
                      // onChange={(event) => setNume(event.target.value)}
                      // value={nume}
                      placeholder={name.name} /> :
                      <span id="consumption-address" className="label-content">{name.adress}, {name.postalCode} {capitalize(name.city)}</span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button className="btn btn-sm btn-primary float-right" >Edit</button>
                </div>
              </div>

              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">Info du client :</span>
                    {d ? <input
                      className="label-content"
                      type="text"
                      id="name"
                      name="name"
                      // onChange={(event) => setNume(event.target.value)}
                      // value={nume}
                      placeholder={name.name} /> :
                      <span id="consumption-address" className="label-content">{name.adress}, {name.postalCode} {capitalize(name.city)}</span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button className="btn btn-sm btn-primary float-right" >Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 ">
          <div className="card">
            <div className="card-header">
              Informations sur le proche
            </div>
            <div className="card-body">
              <h6 className="card-title">Nom: {capitalize(proche.name)}</h6>
              <h6 className="card-title">Prenom: {capitalize(proche.lastName)}</h6>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button className="btn btn-primary float-right">Edit</button>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              Informations sur la personne de confiance
            </div>
            <div className="card-body">
              <h6 className="card-title">Nom: {capitalize(confiance.name)} </h6>
              <h6 className="card-title">Prenom: {capitalize(confiance.lastName)}</h6>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button className="btn btn-primary float-right">Edit</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Patient;

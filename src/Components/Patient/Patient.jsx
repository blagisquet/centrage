import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Patient.css';

function Patient(props) {
  const client = parseFloat(props.match.params.id.slice(1));
  const [name, setName] = useState();
  const [proche, setProche] = useState();
  const [confiance, setConfiance] = useState();
  const [key, setKey] = useState([]);
  const [moda, setModa] = useState(false);
  const [modb, setModb] = useState(false);
  const [modc, setModc] = useState(false);
  const [modd, setModd] = useState(false);
  const [nume, setNume] = useState(name);
  const [filter, setFilter] = useState('select an option');

  useEffect(() => {
    axios.get(`http://192.168.184.172:8001/patients/${client}`)
      .then((result) => {
        setName(result.data);
        setProche(result.data.relativePerson);
        setConfiance(result.data.trustedPerson);
      });
  }, [client]);

  useEffect(() => {
    if (name) setKey(Object.keys(name));
  }, [name]);

  const hCa = () => {
    setModa(true)
  };
  const hCb = () => {
    setModb(true)
  };
  const hCc = () => {
    setModc(true)
  };
  const hCd = () => {
    setModd(true)
  };
  const cAa = () => {
    setModa(false);
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const subMit = () => {
    console.log('buton');
    setModa(!moda);
  };

  const handleSelection = (event) => {
		setFilter(event.target.value);
  };

  const getFilteredList = () => {
		if (filter === "select an option") {
			return key;
		} else {
			return key.filter(info => info === filter);
		}
	};
  
  console.log(getFilteredList());
  


  // name || proche || confiance ? console.log(name, '\n', proche, '\n', confiance) : console.log('unavailable');

  if (!name || !proche || !confiance) {
    return <div className='loadingDiv'> Loading ...</div>
  };

  return (
    <div className="container-fluid">
      <div className="cardDisplay row">
        <div className=" col-12 mb-5"><strong>{capitalize(name.name)} {capitalize(name.lastName)}</strong></div>
        <div className="form-group col-12">
          <label htmlFor="exampleFormControlSelect1">Example select</label>
          <select className="form-control" id="exampleFormControlSelect1" onChange={handleSelection}>
            <option defaultValue>select an option</option>
            {key.map((info, index) =>
              <option key={index} value={info}>{info}</option>
            )}
          </select>
        </div>
        <div className="col-sm-12 mb-3">
          <div className="card">
            <div className="card-header">
              Informations sur client
            </div>
            <div className="card-body">

              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">Adresse du client :</span>

                    {moda ? <input
                      className="label-content"
                      type="text"
                      id="name"
                      name="name"
                      onChange={(event) => setNume(event.target.value)}
                      value={`${capitalize(name.city)}`}
                      placeholder={name.name} /> :
                      <span id="consumption-address" className="label-content">{name.adress}, {name.postalCode} {capitalize(name.city)}</span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button className="btn btn-primary float-right ml-3" onClick={moda ? subMit : hCa}>{moda ? 'send' : 'edit'}</button>
                  {moda ? <button className="btn btn-primary float-right" onClick={cAa}>cancel</button> : <div />}
                </div>
              </div>

              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">info1 du client :</span>
                    {modb ? <input
                      className="label-content"
                      type="text"
                      id="name"
                      name="name"
                      onChange={(event) => setNume(event.target.value)}
                      value={nume}
                      placeholder={name.name} /> :
                      <span id="consumption-address" className="label-content">{name.adress}, {name.postalCode} {capitalize(name.city)}</span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button className="btn btn-primary float-right" onClick={hCb}>Edit</button>
                </div>
              </div>

              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">info2 du client :</span>
                    {modc ? <input
                      className="label-content"
                      type="text"
                      id="name"
                      name="name"
                      onChange={(event) => setNume(event.target.value)}
                      value={nume}
                      placeholder={name.name} /> :
                      <span id="consumption-address" className="label-content">{name.adress}, {name.postalCode} {capitalize(name.city)}</span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button className="btn btn-primary float-right" onClick={hCc}>Edit</button>
                </div>
              </div>

              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">info2 du client :</span>
                    {modd ? <input
                      className="label-content"
                      type="text"
                      id="name"
                      name="name"
                      onChange={(event) => setNume(event.target.value)}
                      value={nume}
                      placeholder={name.name} /> :
                      <span id="consumption-address" className="label-content">{name.adress}, {name.postalCode} {capitalize(name.city)}</span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button className="btn btn-primary float-right" onClick={hCd}>Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 ">
          <div className="card">
            <div className="card-header">
              Proche
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
              Personne confiance
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../Data/config';

const Trusted = (props) => {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const [d, setD] = useState(false);
  const [trusted, setTrusted] = useState();
  const [lstNm, setlstNm] = useState();
  const [mail, setMail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [eventsProps, setEventsProps] = useState({});

  useEffect(() => {
    setEventsProps(props);
  }, [props]);

  useEffect(() => {
    if (eventsProps.data) {
      axios.get(`${url}/trusted-persons/${eventsProps.data}`)
        .then((data) => {
          setTrusted(data.data);
          setlstNm(data.data.lastName);
          setMail(data.data.mail);
          setName(data.data.name);
          setPhone(data.data.phone);
        });
    }
  }, [eventsProps.data]);

  const dataTrustedSend = {
    name: name === '' ? trusted.name : name,
    lastName: lstNm === '' ? trusted.lastName : lstNm,
    mail: mail === '' ? trusted.mail : mail,
    phone: phone === '' ? trusted.phone : parseFloat(phone),
  };

  const capitalize = (string) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const changeTrue = (setHook) => {
    setHook(true);
  };

  const changeFalse = (setHook) => {
    setHook(false);
  };

  const subMitTrusted = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', dataTrustedSend.name);
    data.append('lastName', dataTrustedSend.lastName);
    data.append('mail', dataTrustedSend.mail);
    data.append('phone', dataTrustedSend.phone);

    // method to read FormData()
    // for (let [key, value] of data.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    axios.post(`${url}/trusted-persons/update/${eventsProps.data}`, data)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    setTimeout(window.location.reload.bind(window.location), 500);
  };

  if (!trusted) {
    return <div className="loadingDiv"> Loading ...</div>;
  }

  return (
    <div className="col-sm-6 ">
      <div className="card">
        <div className="card-header">
          Informations sur la personne de confiance
        </div>
        <div className="card-body">

          {/* Nom */}
          <div className="bloc-item-row">
            <div className="bloc-item-content">
              <div>
                <span className="label-placeholder-title">Nom: </span>
                {a ? (
                  <input
                    style={{ border: 'none' }}
                    className="label-content ml-1 mw-75"
                    type="text"
                    id="name"
                    name="name"
                    onChange={event => setName(event.target.value)}
                    value={name}
                    placeholder="nom de la personne de confiance"
                  />
                )
                  : <span id="consumption-address" className="label-content">{capitalize(trusted.name)}</span>}
              </div>
            </div>
            <div className="bloc-item-action">
              <button
                type="button"
                className={`btn float-right btn-sm ml-3 ${a ? 'btn-success' : 'btn-primary'}`}
                onClick={a ? (e) => {
                  subMitTrusted(e);
                  changeFalse(setA);
                }
                  : () => changeTrue(setA)}
              >
                {a ? 'Send' : 'Edit'}
              </button>
              {a ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setA)}>Cancel</button> : <div />}
            </div>
          </div>

          {/* prenom */}
          <div className="bloc-item-row">
            <div className="bloc-item-content">
              <div>
                <span className="label-placeholder-title">Prenom: </span>
                {b ? (
                  <input
                    style={{ border: 'none' }}
                    className="label-content ml-1 mw-100"
                    type="text"
                    id="prenom"
                    name="prenom"
                    onChange={event => setlstNm(event.target.value)}
                    value={lstNm}
                    placeholder="prenom de la personne de confiance"
                  />
                ) : (
                  <span id="consumption-address" className="label-content">
                    {capitalize(trusted.lastName)}
                  </span>
                )}
              </div>
            </div>
            <div className="bloc-item-action">
              <button
                type="button"
                className={`btn float-right btn-sm ml-3 ${b ? 'btn-success' : 'btn-primary'}`}
                onClick={b ? (e) => {
                  subMitTrusted(e);
                  changeFalse(setB);
                } : () => changeTrue(setB)}
              >
                {b ? 'Send' : 'Edit'}
              </button>
              {b ? (
                <button
                  type="button"
                  className="btn btn-info btn-sm float-right"
                  onClick={() => changeFalse(setB)}
                >
                  Cancel
                </button>
              ) : <div />}
            </div>
          </div>

          {/* mail */}
          <div className="bloc-item-row">
            <div className="bloc-item-content">
              <div>
                <span className="label-placeholder-title">Adresse email: </span>
                {c ? (
                  <input
                    style={{ border: 'none' }}
                    className="label-content ml-1"
                    type="text"
                    id="mail"
                    name="mail"
                    onChange={event => setMail(event.target.value)}
                    value={mail}
                    placeholder="mail"
                  />
                ) : <span id="consumption-address" className="label-content">{trusted.mail}</span>}
              </div>
            </div>
            <div className="bloc-item-action">
              <button
                type="button"
                className={`btn float-right btn-sm  ml-3 ${c ? 'btn-success' : 'btn-primary'}`}
                onClick={c ? (e) => {
                  subMitTrusted(e);
                  changeFalse(setC);
                } : () => changeTrue(setC)}
              >
                {c ? 'Send' : 'Edit'}
              </button>
              {c ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setC)}>Cancel</button> : <div />}
            </div>
          </div>

          {/* phone */}
          <div className="bloc-item-row">
            <div className="bloc-item-content">
              <div>
                <span className="label-placeholder-title">Numéro telephone:</span>
                {d ? (
                  <input
                    style={{ border: 'none' }}
                    className="label-content ml-1"
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={event => setPhone(event.target.value)}
                    value={phone}
                    placeholder="numéro telephone"
                  />
                ) : (
                  <span id="consumption-address" className="label-content">
                    {trusted.phone}
                  </span>
                )}
              </div>
            </div>
            <div className="bloc-item-action">
              <button
                type="button"
                className={`btn float-right btn-sm ml-3 ${d ? 'btn-success' : 'btn-primary'}`}
                onClick={d ? (e) => {
                  subMitTrusted(e);
                  changeFalse(setD);
                }
                  : () => changeTrue(setD)}
              >
                {d ? 'Send' : 'Edit'}
              </button>
              {d ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setD)}>Cancel</button> : <div />}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Trusted;

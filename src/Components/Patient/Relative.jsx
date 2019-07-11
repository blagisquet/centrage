import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../Data/config';

const Relative = (props) => {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const [d, setD] = useState(false);
  const [e, setE] = useState(false);
  const [f, setF] = useState(false);
  const [relative, setRelative] = useState();
  const [careGiv, setCareGiv] = useState();
  const [lstNm, setlstNm] = useState();
  const [mail, setMail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [relationship, setRelationship] = useState();
  const [eventsProps, setEventsProps] = useState({});

  useEffect(() => {
    setEventsProps(props);
  }, [props]);

  useEffect(() => {
    if (eventsProps.data) {
      axios.get(`${url}/relative-persons/${eventsProps.data}`)
        .then((data) => {
          setRelative(data.data);
          setCareGiv(data.data.caregiver);
          setlstNm(data.data.lastName);
          setMail(data.data.mail);
          setName(data.data.name);
          setPhone(data.data.phone);
          setRelationship(data.data.relationship);
        });
    }
  }, [eventsProps.data]);

  const dataRelativeSend = {
    name: name === '' ? relative.name : name,
    lastName: lstNm === '' ? relative.lastName : lstNm,
    mail: mail === '' ? relative.mail : mail,
    phone: phone === '' ? relative.phone : parseFloat(phone),
    relationship: relationship === '' ? relative.relationship : relationship,
    caregiver: careGiv === true ? 1 : 0,
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

  const subMitRelative = (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.append('name', dataRelativeSend.name);
    data.append('lastName', dataRelativeSend.lastName);
    data.append('mail', dataRelativeSend.mail);
    data.append('phone', dataRelativeSend.phone);
    data.append('relationship', dataRelativeSend.relationship);
    data.append('caregiver', dataRelativeSend.caregiver);

    // method to read FormData()
    // for (let [key, value] of data.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    axios.post(`${url}/relative-persons/update/${eventsProps.data}`, data)
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

  if (!relative) {
    return <div className="loadingDiv"> Loading ...</div>;
  }

  return (
    <div className="col-sm-6 ">
      <div className="card">
        <div className="card-header">
          Informations sur le proche
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
                    placeholder="nom du proche"
                  />
                ) : <span id="consumption-address" className="label-content">{capitalize(relative.name)}</span>}
              </div>
            </div>
            <div className="bloc-item-action">
              <button
                type="button"
                className={`btn float-right btn-sm ml-3 ${a ? 'btn-success' : 'btn-primary'}`}
                onClick={a ? (ev) => {
                  subMitRelative(ev);
                  changeFalse(setA);
                } : () => changeTrue(setA)}
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
                    placeholder="prenom du proche"
                  />
                ) : (
                  <span id="consumption-address" className="label-content">
                    {capitalize(relative.lastName)}
                  </span>
                )}
              </div>
            </div>
            <div className="bloc-item-action">
              <button
                type="button"
                className={`btn float-right btn-sm ml-3 ${b ? 'btn-success' : 'btn-primary'}`}
                onClick={b ? (ev) => {
                  subMitRelative(ev);
                  changeFalse(setB);
                } : () => changeTrue(setB)}
              >
                {b ? 'Send' : 'Edit'}
              </button>
              {b ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setB)}>Cancel</button> : <div />}
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
                ) : <span id="consumption-address" className="label-content">{relative.mail}</span>}
              </div>
            </div>
            <div className="bloc-item-action">
              <button
                type="button"
                className={`btn float-right btn-sm  ml-3 ${c ? 'btn-success' : 'btn-primary'}`}
                onClick={c ? (ev) => {
                  subMitRelative(ev);
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
                ) : <span id="consumption-address" className="label-content">{relative.phone}</span>}
              </div>
            </div>
            <div className="bloc-item-action">
              <button
                type="button"
                className={`btn float-right btn-sm ml-3 ${d ? 'btn-success' : 'btn-primary'}`}
                onClick={d ? (ev) => {
                  subMitRelative(ev);
                  changeFalse(setD);
                } : () => changeTrue(setD)}
              >
                {d ? 'Send' : 'Edit'}
              </button>
              {d ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setD)}>Cancel</button> : <div />}
            </div>
          </div>

          {/* relationship */}
          <div className="bloc-item-row">
            <div className="bloc-item-content">
              <div>
                <span className="label-placeholder-title">Relationship:</span>
                {e ? (
                  <input
                    style={{ border: 'none' }}
                    className="label-content ml-1"
                    type="text"
                    id="city"
                    name="city"
                    onChange={event => setRelationship(event.target.value)}
                    value={relationship}
                    placeholder="la relation avec le client"
                  />
                ) : <span id="consumption-address" className="label-content">{capitalize(relative.relationship)}</span>}
              </div>
            </div>
            <div className="bloc-item-action">
              <button
                type="button"
                className={`btn float-right btn-sm ml-3 ${e ? 'btn-success' : 'btn-primary'}`}
                onClick={e ? (ev) => {
                  subMitRelative(ev);
                  changeFalse(setE);
                } : () => changeTrue(setE)}
              >
                {e ? 'Send' : 'Edit'}
              </button>
              {e ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setE)}>Cancel</button> : <div />}
            </div>
          </div>

          {/* caregiver */}
          <div className="bloc-item-row">
            <div className="bloc-item-content">
              <div>
                <span className="label-placeholder-title">Caregiver:</span>
                {f ? (
                  <input
                    type="checkbox"
                    id="caregiver"
                    name="caregiver"
                    onChange={() => setCareGiv(!careGiv)}
                    checked={careGiv}
                    value={careGiv}
                    placeholder="la relation avec le client"
                  />
                ) : <span id="consumption-address" className="label-content">{(relative.caregiver === true) ? 'Oui' : 'Non'}</span>}
              </div>
            </div>
            <div className="bloc-item-action">
              <button
                type="button"
                className={`btn float-right btn-sm ml-3 ${e ? 'btn-success' : 'btn-primary'}`}
                onClick={f ? (ev) => {
                  subMitRelative(ev);
                  changeFalse(setF);
                } : () => changeTrue(setF)}
              >
                {f ? 'Send' : 'Edit'}
              </button>
              {f ? (
                <button
                  type="button"
                  className="btn btn-info btn-sm float-right"
                  onClick={() => changeFalse(setF)}
                >
                  Cancel
                </button>
              ) : <div />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relative;

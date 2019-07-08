import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Relative from './Relative';
import './Patient.css';
import Trusted from './Trusted';

const Patient = ({ match }) => {
  const [name, setName] = useState();
  const [procheId, setProcheId] = useState();
  const [confianceId, setConfianceId] = useState();
  const [redirect, setRedirect] = useState(false);
  const [part, setPart] = useState();
  const [id, setId] = useState(0);
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const [d, setD] = useState(false);
  const [e, setE] = useState(false);
  const [f, setF] = useState(false);
  const [rue, setRue] = useState();
  const [code, setCode] = useState();
  const [town, setTown] = useState();
  const [bth, setBth] = useState();
  const [lstNm, setlstNm] = useState();
  const [avlb, setAvlb] = useState();
  const [naam, setNaam] = useState();
  const [data, setData] = useState();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [modif, setModif] = useState([]);
  const [questName, setQuestName] = useState('');
  const [questId, setQuestId] = useState([]);
  const [filter, setFilter] = useState('all');
  const clientId = match.params.id;

  const dataClientSend = {
    address: rue === '' ? name.address : rue,
    postalCode: code === '' ? name.postalCode : parseFloat(code),
    city: town === '' ? name.city : town,
    name: naam === '' ? name.name : naam,
    lastName: lstNm === '' ? name.lastName : lstNm,
    availability: avlb === '' ? name.availability : avlb,
    birthDate: bth === '' ? name.birthDate : bth,
  };

  const handleChange = (index) => {
    const temp = [...modif];
    temp[index] = !temp[index];
    setModif(temp);
    setQuestName(responses[index]);
  };

  const handleSelection = (ev) => {
    setFilter(ev.target.value);
  };

  useEffect(() => {
    axios.get(`http://192.168.184.172:8001/patients/${clientId}`)
      .then((result) => {
        setName(result.data);

        // set hooks for client
        setRue(result.data.address === undefined ? '' : result.data.address);
        setCode(result.data.postalCode);
        setTown(result.data.city);
        setBth(result.data.birthDate);
        setNaam(result.data.name);
        setlstNm(result.data.lastName);
        setAvlb(result.data.availability);
        setPart(result.data.partner);
      });
  }, [clientId]);

  useEffect(() => {
    axios.get(`http://192.168.184.172:8001/patients/${clientId}/datas`)
      .then((result) => {
        setData(result.data);
        let temp = [];
        for (let i = 0; i <= result.data.length; i += 1) {
          temp = [...temp, false];
        }
        setModif(temp);
      });
  }, [clientId]);

  useEffect(() => {
    if (data) {
      setQuestions(data.map(x => x.question.content));
      setResponses(data.map(x => x.response));
      setQuestId(data.map(x => x.id));
    }
  }, [data]);

  useEffect(() => {
    if (name) {
      setProcheId(name.relativePerson.id);
      setConfianceId(name.trustedPerson.id);
    }
  }, [name]);

  const modifyForm = (ev, index) => {
    ev.preventDefault();
    const dataModif = new FormData();
    dataModif.append('response', questName);
    dataModif.append('patient', clientId);
    // for (let [key, value] of data.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    axios.post(`http://192.168.184.172:8001/datas/update/${questId[index]}`, dataModif)
      .then((response) => {
        if (response.status === 202) {
          const respTemp = [...responses];
          respTemp[index] = questName;
          setResponses(respTemp);
        }
        handleChange(index);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const subMitClient = (ev) => {
    ev.preventDefault();
    const dataCl = new FormData();
    dataCl.append('address', dataClientSend.address);
    dataCl.append('postalCode', dataClientSend.postalCode);
    dataCl.append('city', dataClientSend.city);
    dataCl.append('name', dataClientSend.name);
    dataCl.append('lastName', dataClientSend.lastName);
    dataCl.append('availability', dataClientSend.availability);
    dataCl.append('birthDate', dataClientSend.birthDate);

    // method to read FormData()
    // for (let [key, value] of data.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    axios.post(`http://192.168.184.172:8001/patients/update/${clientId}`, dataCl)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    setTimeout(window.location.reload.bind(window.location), 1000);
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
          {window.location.reload(true)}
        </div>
      );
    }
    return null;
  };

  const getFilterList = () => {
    if (filter === 'all') {
      return questions;
    }
    return questions.filter(question => question === filter);
  };

  const capitalize = (string) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  if (!name && !procheId && !confianceId && !data) {
    return <div className="loadingDiv"> Loading ...</div>;
  }

  return (
    <div className="container-fluid">
      {renderRedirect()}
      <div className="cardDisplay row">
        <div className=" col-12 mb-5">
          <div className="col-12">
            {f ? (
              <label htmlFor="name">
                <small>Prenom</small>
                <input
                  style={{ border: 'none' }}
                  className="label-content ml-1 w-50"
                  type="text"
                  id="name"
                  name="name"
                  onChange={event => setNaam(event.target.value)}
                  value={naam}
                  placeholder="prenom du client"
                />
              </label>
            ) : (
              <span>
                <small>Prenom: </small>
                {capitalize(name.name)}
                {' '}
              </span>
            )}
            {f ? (
              <label htmlFor="lastName">
                <small>Nom</small>
                <input
                  style={{ border: 'none' }}
                  className="label-content ml-1 w-50"
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={event => setlstNm(event.target.value)}
                  value={lstNm}
                  placeholder="nom du client"
                />
              </label>
            ) : (
              <span>
                <small>Nom: </small>
                <strong>{capitalize(name.lastName)}</strong>
              </span>
            )}
            <button
              type="button"
              className={`btn float-right btn-sm ml-3 ${f ? 'btn-success' : 'btn-primary'}`}
              onClick={f ? (ev) => {
                subMitClient(ev);
                changeFalse(setF);
              } : () => changeTrue(setF)}
            >
              {f ? 'Send' : 'Edit'}
            </button>
            {f ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setF)}>Cancel</button> : <div />}
          </div>
        </div>
        <div className="col-sm-12 mb-3">
          <div className="card">
            <div className="card-header">
              Informations sur client
              <button
                type="button"
                className="btn btn-sm float-right btn-warning"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Data
              </button>
              <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog " role="document">
                  <div className="modal-content">

                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Client data</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div>
                      <select onChange={handleSelection} value={filter} className="custom-select custom-select-sm">
                        <option value="all">All</option>
                        {questions.map((x, i) => (
                          <option key={[i]} value={x}>{capitalize(x)}</option>
                        ))}
                      </select>
                    </div>

                    <div className="modal-body">

                      {getFilterList().map((value, index) => (
                        <div className="mb-2" key={[index]}>
                          {modif[index]
                            ? (
                              <label htmlFor="questName">
                                <small>
                                  {capitalize(questions[index])}
                                  {' '}
                                  :
                                  {' '}
                                </small>
                                <input
                                  style={{ border: 'none' }}
                                  type="text"
                                  id="questName"
                                  name="questName"
                                  onChange={event => setQuestName(event.target.value)}
                                  value={questName}
                                  placeholder={questions[index]}
                                />
                              </label>
                            ) : (
                              <span>
                                {capitalize(value)}
                                {' '}
                                :
                                {' '}
                                {responses[index]}
                                {modif[index]}
                              </span>
                            )}
                          <button
                            type="button"
                            onClick={modif[index]
                              ? event => modifyForm(event, index) : () => handleChange(index)}
                            className={`btn float-right btn-sm ml-3 ${modif[index] ? 'btn-success' : 'btn-primary'}`}
                          >
                            {modif[index] ? 'Send' : 'Edit'}
                          </button>
                          {modif[index] ? (
                            <button
                              type="button"
                              className="btn btn-info btn-sm float-right"
                              onClick={() => {
                                handleChange(index);
                              }}
                            >
                              Cancel
                            </button>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="card-body">

              {/* Partner */}
              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">Partner</span>
                    {(part === null) || (part === undefined) ? <span className="label-content">Seul au domicile</span> : (
                      <span id="consumption-address" className="label-content">
                        <button
                          type="button"
                          onClick={() => {
                            setRedirect(true);
                            setId(part.id);
                          }}
                        >
                          <strong>{capitalize(part.name)}</strong>
                          {capitalize(part.lastName)}
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Rue */}
              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">Adresse du client: Rue</span>
                    {a ? (
                      <input
                        style={{ border: 'none' }}
                        className="label-content ml-1 mw-75"
                        type="text"
                        id="rue"
                        name="rue"
                        onChange={event => setRue(event.target.value)}
                        value={rue}
                        placeholder="nom de rue"
                      />
                    ) : <span id="consumption-address" className="label-content">{name.address}</span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button
                    type="button"
                    className={`btn float-right btn-sm ml-3 ${a ? 'btn-success' : 'btn-primary'}`}
                    onClick={a ? (ev) => {
                      subMitClient(ev);
                      changeFalse(setA);
                    } : () => changeTrue(setA)}
                  >
                    {a ? 'Send' : 'Edit'}
                  </button>
                  {a ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setA)}>Cancel</button> : <div />}
                </div>
              </div>

              {/* code postal */}
              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">Adresse du client: Code</span>
                    {b ? (
                      <input
                        style={{ border: 'none' }}
                        className="label-content ml-1 mw-100"
                        type="text"
                        id="code"
                        name="code"
                        onChange={event => setCode(event.target.value)}
                        value={code}
                        placeholder="code postal"
                      />
                    ) : <span id="consumption-address" className="label-content">{name.postalCode}</span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button
                    type="button"
                    className={`btn float-right btn-sm ml-3 ${b ? 'btn-success' : 'btn-primary'}`}
                    onClick={b ? (ev) => {
                      subMitClient(ev);
                      changeFalse(setB);
                    } : () => changeTrue(setB)}
                  >
                    {b ? 'Send' : 'Edit'}
                  </button>
                  {b ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setB)}>Cancel</button> : <div />}
                </div>
              </div>

              {/* ville */}
              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">Adresse du client: Ville</span>
                    {c ? (
                      <input
                        style={{ border: 'none' }}
                        className="label-content ml-1"
                        type="text"
                        id="town"
                        name="town"
                        onChange={event => setTown(event.target.value)}
                        value={town}
                        placeholder="ville"
                      />
                    ) : <span id="consumption-address" className="label-content">{capitalize(name.city)}</span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button
                    type="button"
                    className={`btn float-right btn-sm  ml-3 ${c ? 'btn-success' : 'btn-primary'}`}
                    onClick={c ? (ev) => {
                      subMitClient(ev);
                      changeFalse(setC);
                    } : () => changeTrue(setC)}
                  >
                    {c ? 'Send' : 'Edit'}
                  </button>
                  {c ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setC)}>Cancel</button> : <div />}
                </div>
              </div>

              {/* date naissance */}
              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">Date naissance client</span>
                    {d ? (
                      <input
                        style={{ border: 'none' }}
                        className="label-content ml-1"
                        type="date"
                        id="city"
                        name="city"
                        onChange={event => setBth(event.target.value)}
                        value={bth}
                        placeholder="date naissance"
                      />
                    ) : (
                      <span id="consumption-address" className="label-content">
                        {new Date(name.birthDate).toISOString().replace(/T.*/, '').split('-')
                          .reverse()
                          .join('-')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button
                    type="button"
                    className={`btn float-right btn-sm ml-3 ${d ? 'btn-success' : 'btn-primary'}`}
                    onClick={d ? (ev) => {
                      subMitClient(ev);
                      changeFalse(setD);
                    } : () => changeTrue(setD)}
                  >
                    {d ? 'Send' : 'Edit'}
                  </button>
                  {d ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setD)}>Cancel</button> : <div />}
                </div>
              </div>

              {/* availability */}
              <div className="bloc-item-row">
                <div className="bloc-item-content">
                  <div>
                    <span className="label-placeholder-title">Availability</span>
                    {e ? (
                      <input
                        style={{ border: 'none' }}
                        className="label-content ml-1"
                        type="text"
                        id="city"
                        name="city"
                        onChange={event => setAvlb(event.target.value)}
                        value={avlb}
                        placeholder="availability"
                      />
                    ) : <span id="consumption-address" className="label-content">{name.availability}</span>}
                  </div>
                </div>
                <div className="bloc-item-action">
                  <button
                    type="button"
                    className={`btn float-right btn-sm ml-3 ${e ? 'btn-success' : 'btn-primary'}`}
                    onClick={e ? (ev) => {
                      subMitClient(ev);
                      changeFalse(setE);
                    } : () => changeTrue(setE)}
                  >
                    {e ? 'Send' : 'Edit'}
                  </button>
                  {e ? <button type="button" className="btn btn-info btn-sm float-right" onClick={() => changeFalse(setE)}>Cancel</button> : <div />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Relative data={procheId} />
        <Trusted data={confianceId} />
      </div>
    </div>
  );
};

export default Patient;


Patient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

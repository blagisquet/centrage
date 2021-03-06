import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Data from '../Data/Data';

const Proche = (props) => {
  const [questions, setQuestions] = useState();
  const [categorie, setCategorie] = useState();
  const [eventsProps, setEventsProps] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setEventsProps(props);
  }, [props]);

  useEffect(() => {
    if (eventsProps.data) {
      setQuestions(eventsProps.data.questions);
    }
  }, [eventsProps.data]);

  useEffect(() => {
    Data((result) => {
      setCategorie(result[0]);
    });
  }, []);

  const capitalize = (string) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // eslint-disable-next-line react/prop-types
  const QuestionLine = ({ color }) => (
    <hr
      style={{
        color,
        backgroundColor: color,
      }}
    />
  );

  const renderRedirect = () => {
    if (redirect) {
      return (
        <div>
          <Redirect to="/formulaire/page2" />
        </div>
      );
    }
    return null;
  };

  // const modifyForm = (ev) => {
  //   ev.preventDefault();
  //   const dataModif = new FormData();
  //   dataModif.append('name', 'flocea');
  //   dataModif.append('lastName', 'ninja');
  //   dataModif.append('phone', '0680868685');
  //   dataModif.append('relationship', 'fils');
  //   dataModif.append('mail', 'x@z.fr');
  //   dataModif.append('caregiver', 0);

  //   axios.post(`${url}/relative-persons/`, dataModif)
  //     .then((response) => {
  //       // eslint-disable-next-line no-console
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       // eslint-disable-next-line no-console
  //       console.log(error);
  //     });
  // };

  const nullSituation = (x) => {
    const forIndex = x.type.slice(-2, -1);
    // const lessindex = x.type.slice(-4, -3);

    const nullLabels = [];
    for (let i = 0; i <= forIndex; i += 1) {
      nullLabels.push('not defined');
    }
    return nullLabels;
  };

  const notNullSituation = (x) => {
    const forIndex = x.type.slice(-2, -1);
    // const lessindex = x.type.slice(-4, -3);

    const labels = (x.label).split(',');

    const array = [];
    for (let i = 0; i <= forIndex; i += 1) {
      array.push(
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={(e) => {
                // eslint-disable-next-line no-console
                console.log(e.target.value);
              }}
              id="inlineCheckbox1"
              value={labels[i]}
            />
            <span className="mr-2">{labels[i]}</span>
          </label>
        </div>,
      );
    }
    return array;
  };

  if (!questions || !categorie) { return <div>loading</div>; }

  return (
    <div className="container-fluid cardDisplay">
      <h2 className="mb-5">
        Questions concernant le
        {' '}
        <em>{categorie.name}</em>
      </h2>
      {
        questions.map((x, i) => {
          if (x.type === 'string' || x.type === 'Texte') {
            return (
              <div key={[i]} className="mt-3">
                <div><strong>{capitalize(x.content)}</strong></div>
                <div className="text-secondary">
                  {x.comment ? (
                    <span>
                      <hr style={{ borderTop: 'dashed 1px', width: '50%' }} />
                      <small>{x.comment}</small>
                      <hr style={{ borderTop: 'dashed 1px', width: '50%' }} />
                    </span>
                  ) : <div />}
                </div>
                <input placeholder={x.content} className="mb-2 mt-2 w-50" />
                <QuestionLine color="black" />
              </div>
            );
          }

          if (x.type === 'bool' || x.type === 'Oui/Non') {
            return (
              <div key={[i]} className="mt-3">
                <div><strong>{capitalize(x.content)}</strong></div>
                <div className="text-secondary">
                  {x.comment ? (
                    <span>
                      <hr style={{ borderTop: 'dashed 1px', width: '50%' }} />
                      <small>{x.comment}</small>
                      <hr style={{ borderTop: 'dashed 1px', width: '50%' }} />
                    </span>
                  ) : <div />}
                </div>
                <label htmlFor="Oui/Non" className="ml-5">
                  <span className="mr-3">Oui</span>
                  <input type="checkbox" />
                </label>
                <label htmlFor="Oui/Non" className="ml-5">
                  <span className="mr-3">Non</span>
                  <input type="checkbox" />
                </label>
                <QuestionLine color="black" />
              </div>
            );
          }

          if (x.type === 'int' || x.type === 'Nombre') {
            return (
              <div key={[i]} className="mt-3">
                <div><strong>{capitalize(x.content)}</strong></div>
                <div className="text-secondary">
                  {x.comment ? (
                    <span>
                      <hr style={{ borderTop: 'dashed 1px', width: '50%' }} />
                      <small>{x.comment}</small>
                      <hr style={{ borderTop: 'dashed 1px', width: '50%' }} />
                    </span>
                  ) : <div />}
                </div>
                <input placeholder={x.content} className="mb-2 mt-2 w-50" />
                <QuestionLine color="black" />
              </div>
            );
          }

          if (x.type.includes('Echel') || x.type.includes('echel')) {
            return (
              <div key={[i]} className="mt-3">
                <div><strong>{capitalize(x.content)}</strong></div>
                <div className="text-secondary">
                  {x.comment ? (
                    <span>
                      <hr style={{ borderTop: 'dashed 1px', width: '50%' }} />
                      <small>{x.comment}</small>
                      <hr style={{ borderTop: 'dashed 1px', width: '50%' }} />
                    </span>
                  ) : <div />}
                </div>
                {
                  (x.label === null) || (x.label === undefined)
                    ? nullSituation(x).map((item, index) => (
                      <span key={[index]} className="mr-3">
                        <div className="form-check form-check-inline">
                          <label className="form-check-label" htmlFor="inlineCheckbox1">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                // eslint-disable-next-line no-console
                                console.log(e.target.value);
                              }}
                              id="inlineCheckbox1"
                              value={item}
                            />
                            <span className="mr-2">{item}</span>
                          </label>
                        </div>
                      </span>
                    ))
                    : notNullSituation(x).map((item, index) => (<span key={[index]}>{item}</span>))}
                <QuestionLine color="black" />
              </div>
            );
          }

          return null;
        })
      }
      {renderRedirect()}
      <div>
        <button type="button" className="mt-5 mb-5 mr-5 float-right btn btn-primary" onClick={() => setRedirect(true)}>passez a la prochaine categorie</button>
      </div>
    </div>
  );
};

export default Proche;

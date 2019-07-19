import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Data from '../Data/Data';
import url from '../Data/config';

const Client = () => {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    Data((result) => {
      setQuestions(result[1].questions);
    });
  }, []);
  
  console.log(questions);
  
  

  

  const modifyForm = (ev) => {
    ev.preventDefault();
    const dataModif = new FormData();
    dataModif.append('name', 'flocea');
    dataModif.append('lastName', 'ninja');
    dataModif.append('phone', '0680868685');
    dataModif.append('relationship', 'fils');
    dataModif.append('mail', 'x@z.fr');
    dataModif.append('caregiver', 0);

    axios.post(`${url}/relative-persons/`, dataModif)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const testSituation = (x) => {
    const forIndex = x.type.slice(-2, -1);
    // const lessindex = x.type.slice(-4, -3);

    const labels = JSON.parse(x.label);
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

  if (!questions) { return <div>loading</div>; }

  return (
    <div className="container-fluid cardDisplay">
<h2>Bla</h2>
      {
        questions.map((x, i) => {
          if (x.type === 'string') {
            return (
              <div key={[i]}>
                {x.content}
                <span className="text-secondary"> {x.comment ? x.comment : <div />}  </span>
                <input placeholder="string" />
              </div>
            );
          }
          if (x.type === 'bool') {
            return (
              <div key={[i]}>
                {x.content}
                <span>{x.comment ? x.comment : <div />}</span>
                <input type="checkbox" />
              </div>
            );
          }

          if (x.type === 'bool') {
            return (
              <div key={[i]}>
                {x.content}
                <input type="checkbox" />
                <span>{x.comment ? x.comment : <div />}</span>
              </div>
            );
          }

          if (x.type === 'int') {
            return (
              <div key={[i]}>
                {x.content}
                <input placeholder="number" />
                <span>{x.comment ? x.comment : <div />}</span>
              </div>
            );
          }

          if (x.type.includes('Echel')) {
            return (
              <div key={[i]}>
                {
                  <span className="mr-2">
                    {x.content}
                    :
                  </span>}
                {testSituation(x, i).map((item, index) => (<span key={[index]}>{item}</span>))}
                <span>{x.comment ? x.comment : <div />}</span>
              </div>
            );
          }

          return null;
        })
      }
      
    </div>

  );
};

export default Client;

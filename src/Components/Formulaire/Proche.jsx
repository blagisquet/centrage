import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Proche = (props) => {
  const [questions, setQuestions] = useState();
  const [eventsProps, setEventsProps] = useState({});


  useEffect(() => {
    setEventsProps(props);
  }, [props]);

  useEffect(() => {
    if (eventsProps.data) {
      setQuestions(eventsProps.data.questions);
    }
  }, [eventsProps.data]);

  console.log(questions);
  

  const modifyForm = (ev, index) => {
    ev.preventDefault();
    const dataModif = new FormData();
    dataModif.append('name', "flocea");
    dataModif.append('lastName', "ninja");
    dataModif.append('phone', '0680868685');
    dataModif.append('relationship', "fils");
    dataModif.append('mail', "x@z.fr");
    dataModif.append('caregiver', 0);

    for (let [key, value] of dataModif.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios.post(`http://192.168.184.172:8001/relative-persons/`, dataModif)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };



  const testSituation = (x) => {
    const forIndex = x.type.slice(-2, -1);
    const lessindex=x.type.slice(-4,-3);
    console.log(lessindex);
    
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


  if (!questions) {
    return (<div>loading</div>);
  }

  return (
    <div className='container-fluid cardDisplay' >

      {
        questions.map((x, i) => {

          if (x.type === 'string') {
            return (<div key={[i]}>
              {x.content}
              <input placeholder="string" />
            </div>)
          }
          if (x.type === 'bool') {
            return (<div key={[i]}>
              {x.content}
              <input type="checkbox" />
            </div>)
          }
          if (x.type === 'int') {
            return (
              <div key={[i]}>
                {x.content}
                <input placeholder="number" />
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
                {testSituation(x, i).map((item, index) => {
                  return (<span key={[index]}>{item}</span>)
                })
                }

              </div>
            )
          }

          return null;

        })
      }
      <div>
        <button type="button" onClick={(e) => { modifyForm(e) }}>send</button>
      </div>
    </div>

  )
}

export default Proche;
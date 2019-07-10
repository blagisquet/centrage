import React, { useState, useEffect } from 'react';
import './Coherence.css';

const Coherence = (props) => {

  const [questions, setQuestions] = useState();
  const situationFam=['seul', 'veuf','divorce']
  const response = ['often', 'not often', 'rarely', 'only','never','coucou'];

  useEffect(() => {
    if (props.data)
    setQuestions(props.data.questions);
  }, [props.data]);

  console.log(questions);

  const testSituation = (question) => {
    const forIndex = question.type.slice(-2, -1);
    let array = [];
    for (let i = 0; i <= forIndex; i += 1) {
      array.push(
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <span className="mr-2">{situationFam[i]}</span>
            </label>
          </div>
      )
    }
    return array;
  }
  
  const testResp = (question) => {
    const forIndex = question.type.slice(-2, -1);
    let array = [];
    for (let i = 0; i <= forIndex; i += 1) {
      array.push(
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              <span className="mr-2">{response[i]}</span>
            </label>
          </div>
      )
    }
    return array;
  }

  return (
    questions ? questions.map((question, i) => {
    if (question.type === 'string') {
      return (<div key={[i]}>
        {question.content}
        <input placeholder="string" />
      </div>)
    } else if (question.type === 'bool') {
      return (<div key={[i]}>
        {question.content}
        <input type="checkbox" />
      </div>)
    } else if (question.type === 'int') {
      return (<div key={[i]}>
        {question.content}
        <input placeholder="number" />
      </div>)
    } else if (question.type.includes('echel')&&((question.type.slice(-2, -1))==="2")) {
      return (
        <div key={[i]}>
          {
            <span>{question.content}{' '}:{' '}</span>}
          {testSituation(question).map((item, index) => {
            return (<span key={[index]}>{item}</span>)
          })
          }
        </div>
      )
    }else if (question.type.includes('echel')&&((question.type.slice(-2, -1))==="5")) {
      return (
        <div key={[i]}>
          {
            <span>{question.content}{' '}:{' '}</span>}
          {testResp(question).map((item, index) => {
            return (<span key={[index]}>{item}</span>)
          })
          }
        </div>
      )
    }
  })
    :
    <div>loading</div>)
}

export default Coherence;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'underscore';
import './Questions.css';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [filterCategory, setFilterCategory] = useState([false]);
  useEffect(() => {
    axios.get('http://192.168.8.158:8000/questions')
      .then((result) => {
        setQuestions(result.data);
      });
  }, []);

  const filterQuestions = (tag, [setFunc, param]) => {
    if (param) {
      setQuestions(_.sortBy(questions, tag).reverse());
    } else {
      setQuestions(_.sortBy(questions, tag).reverse());
    }
    setFunc(!param);
  };

  return (
    <div className="container" id="questions-style">
      <h1>Questions</h1>
      <button type="button" className="btn btn-success">Ajouter une question</button>
      <table className="question-table-style table table-hover table-bordered">
        <thead>
          <tr>
            <th className="col-4" scope="col">Questions</th>
            <th onClick={() => filterQuestions('name', [setFilterCategory, filterCategory])} className="col-3" scope="col">Catégorie</th>
            <th className="col-3" scope="col">Type de questions</th>
            <th className="col-1" scope="col">Editer</th>
            <th className="col-1" scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={[index]}>
              <th scope="row">{question.question}</th>
              <td>
                <input type="text" />
                {question.categorie}
              </td>
              <td>{question.type}</td>
              <td><button type="button" className="btn btn-primary btn-sm float-right">Editer</button></td>
              <td><button type="button" className="btn btn-primary btn-sm float-right">Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Questions;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'underscore';
import './Questions.css';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState([false]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const dataSend = {
    name: name,
    category: category,
    type: type+'('+min+','+max+')'
  }
  useEffect(() => {
    axios.get('http://192.168.184.172:8000/question')
      .then((result) => {
        console.log(result);
        setQuestions(result.data);
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    console.log(dataSend);
    axios.post('http://192.168.184.172:8000/new', dataSend)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get('http://192.168.184.172:8000/categories')
      .then((result) => {
        setCategories(result.data);
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
      <form>
        <div className="form-group">
          <label htmlFor="formName">Nom de la question</label>
          <input type="text" className="form-control" id="formName" onChange={e => setName(e.target.value)} placeholder="Nom de la question" />
        </div>
        <div className="form-group form-row col-md-4 col">
          <label htmlFor="inputState">Catégorie</label>
          <select id="inputState" className="form-control" onChange={e => setCategory(e.target.value)}>
            <option value='0' disabled selected>Choix catégorie</option>
            {categories.map((category, index) => (
              <option key={[index]}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group form-row col-md-4 col">
          <label htmlFor="inputState">Type de question</label>
          <select id="inputState" className="form-control" onChange={e => setType(e.target.value)}>
            {/*{questions.map((question, index) => (
              <option key={[index]}>
                {question.type}
              </option>
            ))} */}
            <option disabled selected>Choix du type de question</option>
            <option>Oui/Non</option>
            <option>Echelle</option>
            <option>Texte</option>
            <option>Nombre</option>
          </select>
        </div>
        <div className="form-group col-md-4" >
          <label htmlFor="echelleMin">Echelle min</label>
          <input type="number" className="form-control" id="echelleMin" onChange={e => setMin(e.target.value)} />
          <label htmlFor="echelleMax">Echelle max</label>
          <input type="number" className="form-control" id="echelleMax" onChange={e => setMax(e.target.value)} />
        </div>
        <button type="submit" onClick={submit} className="btn btn-success">Ajouter une question</button>
      </form>
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
              <th scope="row">{question.content}</th>
              <td>
                {/*<input type="text" />*/}
                {question.category}
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

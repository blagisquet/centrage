import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'underscore';
import './Questions.css';
import { arrayExpression } from '@babel/types';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState([false]);
  const [questName, setQuestName] = useState('');
  const [questCat, setQuestCat] = useState('');
  const [questType, setQuestType] = useState('');
  const [questMin, setQuestMin] = useState(0);
  const [questMax, setQuestMax] = useState(0);
  const [name, setName] = useState(questName);
  const [category, setCategory] = useState(questCat);
  const [type, setType] = useState(questType);
  const [min, setMin] = useState(questMin);
  const [max, setMax] = useState(questMax);
  const [modif, setModif] = useState([]);
  const [questId, setQuestId] = useState('');

  const handleChange = (index) => {
    console.log(index)
    let temp = [...modif];
    temp[index] = !temp[index];
    setModif(temp);
    setQuestName(questions[index].content);
    setQuestCat(questions[index].category.name);
    setQuestType(questions[index].type);
    setQuestId(questions[index].id);
  };

  const modifyForm = (e, index) => {
    e.preventDefault();

    const data = new FormData();
    data.append('content', dataModif.questName);
    data.append('category', dataModif.questCat);
    data.append('type', dataModif.questType);

    console.log(data)
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios.post(`http://192.168.184.172:8001/questions/update/${questId}`, data)
      .then((response) => {
        handleChange(index)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const dataModif = {
    questName: questName,
    questCat: questCat,
    questType: questType
  }

  const dataSend = {
    name: name,
    category: category,
    type: type + '(' + min + ',' + max + ')',
  };

  const deleteQuestion = (e, index) => {
    e.preventDefault();
    console.log(questId);
    axios.delete(`http://192.168.184.172:8001/questions/${questId}`)
      .then((response) => {
        console.log(index);
        arrayExpression.splice(index);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get('http://192.168.184.172:8001/questions')
      .then((result) => {
        setQuestions(result.data);
        setQuestId(result.data.id);
        console.log(result.data.length);
        let temp = [];
        for (let i = 0; i <= result.data.length; i++) {
          temp = [...temp, false]
        }
        setModif(temp)
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', dataSend.name);
    data.append('category', dataSend.category);
    data.append('type', dataSend.type);
    axios.post('http://192.168.184.172:8001/questions/id', data)
      .then((response) => {
        if (response.status === 201) {
          setQuestions([...questions, {
            id: response.data.id,
            content: name,
            type: type,
            category: {
              name: category,
            },
          },
          ]);
        }
      });
  };

  useEffect(() => {
    axios.get('http://192.168.184.172:8001/categories')
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
        <div className="row">
          <div className="form-group">
            <label htmlFor="formName" className="inputWidth">
              Nom de la question
              <input type="text" className="form-control" id="formName" onChange={e => setName(e.target.value)} placeholder="Nom de la question" />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="form-row align-items-center col-md-6">
            <label htmlFor="inputState">
              Catégorie
              <select id="inputState" className="form-control" onChange={e => setCategory(e.target.value)}>
                <option defaultValue>Choix catégorie</option>
                {categories.map((category, index) => (
                  <option key={[index]}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row align-items-center col-md-6">
            <label htmlFor="inputState">
              Type de question
              <select id="inputState" className="form-control" onChange={e => setType(e.target.value)}>
                {/* {questions.map((question, index) => (
              <option key={[index]}>
                {question.type}
              </option>
            ))} */}
                <option defaultValue>Choix du type de question</option>
                <option>Oui/Non</option>
                <option>Echelle</option>
                <option>Texte</option>
                <option>Nombre</option>
              </select>
            </label>
          </div>
        </div>
        <div className="row maxStyle">
          <div className="form-row align-items-center col-md-6">
            <label htmlFor="echelleMin">
              Echelle min
              <input type="number" className="form-control" id="echelleMin" onChange={e => setMin(e.target.value)} />
            </label>
          </div>
          <div className="form-row align-items-center col-md-6">
            <label htmlFor="echelleMax">
              Echelle max
              <input type="number" className="form-control" id="echelleMax" onChange={e => setMax(e.target.value)} />
            </label>
          </div>
        </div>
        <button type="submit" onClick={submit} className="btn btn-success questionBut">Ajouter une question</button>
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
            <tr key={index}>
              <th scope="row">
                {modif[index] ? <input
                  type="text"
                  id="questName"
                  name="questName"
                  onChange={(event) => setQuestName(event.target.value)}
                  value={questName}
                  placeholder={question.content} /> : <div>{question.content} {modif[index]}</div>}
                {/*{question.content}*/}</th>
              <td>
                {modif[index] ? <select
                  id="inputState"
                  className="form-control"
                  onChange={e => setQuestCat(e.target.value)}>
                  <option defaultValue>Choix catégorie</option>
                  {categories.map((category, index) => (
                    <option key={[index]}>
                      {category.name}
                    </option>
                  ))}
                </select> : <div>{question.category.name}</div>}
                </td>
              <td>
                {question.type}</td>
              <td><button type="button" onClick={modif[index] ? (event) => modifyForm(event, index) : () =>

                handleChange(index)} className="btn btn-primary btn-sm float-right">{modif[index] ? 'Valider' : 'Editer'}</button></td>
              <td><button type="button" onClick={deleteQuestion[index]} className="btn btn-primary btn-sm float-right">Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Questions;

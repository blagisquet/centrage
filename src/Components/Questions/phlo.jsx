import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'underscore';
import url from '../Data/config';
import './Questions.css';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState([false]);
  const [questName, setQuestName] = useState('');
  const [questCat, setQuestCat] = useState('');
  const [questType, setQuestType] = useState('');
  const [name, setName] = useState(questName);
  const [category, setCategory] = useState(questCat);
  const [type, setType] = useState(questType);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [modif, setModif] = useState([]);
  const [questId, setQuestId] = useState('');
  const [label, setLabel] = useState('');
  const [questLabel, setQuestLabel] = useState('');
  const handleChange = (index) => {
    const temp = [...modif];
    temp[index] = !temp[index];
    setModif(temp);
    setQuestName(questions[index].content);
    setQuestCat(questions[index].category.name);
    setQuestType(questions[index].type);
    setQuestId(questions[index].id);
    setQuestLabel(questions[index].label);
  };
  const deleteQuestion = (e, index, indexBdd) => {
    e.preventDefault();
    const data = new FormData();
    data.append('index', indexBdd);
    axios.delete(`${url}/questions/${indexBdd}`, data)
      .then(() => {
        const delQTemp = [...questions];
        delQTemp.splice(index, 1);
        setQuestions(delQTemp);
      });
  };
  useEffect(() => {
    axios.get(`${url}/questions`)
      .then((result) => {
        setQuestions(result.data);
        setQuestId(result.data.id);
        let temp = [];
        for (let i = 0; i <= result.data.length; i += 1) {
          temp = [...temp, false];
        }
        setModif(temp);
      });
  }, []);

  const dataModif = {
    modQuestName: questName,
    modQuestCat: questCat,
    modQuestType: questType,
    modQuestLabel: questLabel,
  };

  const modifyForm = (e, index) => {
    e.preventDefault();
    const data = new FormData();
    data.append('content', dataModif.modQuestName);
    data.append('category', dataModif.modQuestCat);
    data.append('type', dataModif.modQuestType);
    data.append('label', JSON.stringify(dataModif.modQuestLabel.split(',')));
    console.log(dataModif);
    axios.post(`${url}/questions/update/${questId}`, data)
      .then((response) => {
        if (response.status === 200) {
          const questTemp = [...questions];
          questTemp[index].content = questName;
          setQuestions(questTemp);
          questTemp[index].category.name = questCat;
          setQuestions(questTemp);
          questTemp[index].label = questLabel;
          console.log(questTemp[index]);
          setQuestions(questTemp);
        }
        handleChange(index);
      });
  };

  const dataSend = {
    dataName: name,
    dataCategory: category,
    dataType: `${type}(${min},${max})`,
    dataLabel: label,
  };

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', dataSend.dataName);
    data.append('category', dataSend.dataCategory);
    data.append('type', dataSend.dataType);
    data.append('label', JSON.stringify(dataSend.dataLabel.split(',')));
    axios.post(`${url}/questions/`, data)
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          setQuestions([...questions, {
            id: response.data.id,
            content: name,
            type: type,
            label: JSON.stringify(label),
            category: {
              name: category,
            },
          },
          ]);
          console.log(questions);
        }
      });
  };

  useEffect(() => {
    axios.get(`${url}/categories`)
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
    <div id="questions-style">
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
          <div className="form-row align-items-center col-6">
            <label htmlFor="catSelect">
              Catégorie
              <select id="catSelect" className="form-control half" onChange={e => setCategory(e.target.value)}>
                <option defaultValue>Choix catégorie</option>
                {categories.map((mapCategory, index) => (
                  <option key={[index]}>
                    {mapCategory.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row align-items-center col-6">
            <label id="typeQuest" htmlFor="typeQuest">
              Type de question
              <select id="typeQuest" className="form-control half" onChange={e => setType(e.target.value)}>
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
          <div className="form-row align-items-center col-6">
            <label htmlFor="echelleMin">
              Echelle min
              <input type="number" className="form-control half" id="echelleMin" onChange={e => setMin(e.target.value)} />
            </label>
          </div>
          <div className="form-row align-items-center col-6 half">
            <label htmlFor="echelleMax">
              Echelle max
              <input type="number" className="form-control half" id="echelleMax" onChange={e => setMax(e.target.value)} />
            </label>
          </div>
        </div>
        <div className="row maxStyle">
          <label htmlFor="labelQuest">
            Valeurs des échelles
            <input type="text" className="form-control inputWidth" id="labelQuest" onChange={e => setLabel(e.target.value)} />
          </label>
        </div>
        <button type="submit" onClick={submit} className="btn btn-success questionBut">Ajouter une question</button>
      </form>
      <table className="question-table-style table table-hover table-bordered">
        <thead>
          <tr>
            <th className="col-4" scope="col">Questions</th>
            <th onClick={() => filterQuestions('name', [setFilterCategory, filterCategory])} className="col-3" scope="col">Catégorie</th>
            <th className="col-3" scope="col">Type de questions</th>
            <th className="col-3" scope="col">Valeurs échelle</th>
            <th className="col-1" scope="col">Editer</th>
            <th className="col-1" scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={[index]}>
              <th scope="row">
                {
                  modif[index]
                    ? (
                      <input
                        type="text"
                        id="questName"
                        name="questName"
                        onChange={event => (setQuestName(event.target.value))}
                        value={questName}
                        placeholder={question.content}
                      />
                    )
                    : (
                      <div>
                        {question.content}
                        {modif[index]}
                      </div>
                    )
                }
              </th>
              <td>
                {modif[index]
                  ? (
                    <select
                      id="inputState"
                      className="form-control"
                      onChange={e => setQuestCat(e.target.value)}
                    >
                      <option defaultValue>Choix catégorie</option>
                      {categories.map((mapCategory, catIndex) => (
                        <option key={[catIndex]}>
                          {mapCategory.name}
                        </option>
                      ))}
                    </select>
                  )
                  : (
                    <div>
                      {question.category.name}
                    </div>
                  )
                }
              </td>
              <td>{question.type}</td>
              <td>
                {
                  modif[index]
                    ? (
                      <input
                        type="text"
                        id="questLabel"
                        name="questLabel"
                        onChange={event => setQuestLabel(event.target.value)}
                        value={questLabel}
                        placeholder={JSON.parse(question.label)}
                      />
                    )
                    : (
                      <div>
                        {JSON.parse(question.label)}
                        {modif[index]}
                      </div>
                    )
                }
              </td>
              <td>
                <button type="button" onClick={modif[index] ? event => modifyForm(event, index) : () => handleChange(index)} className="btn btn-primary btn-sm float-right">{modif[index] ? 'Valider' : 'Editer'}</button>
              </td>
              <td>
                <button type="button" onClick={e => deleteQuestion(e, index, question.id)} className="btn btn-primary btn-sm float-right">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Questions;

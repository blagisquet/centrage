import React, { useState, useEffect } from 'react';
import './Category.css';
import axios from 'axios';
import _ from 'underscore';
import url from '../Data/config';

function Category() {
  const [categories, setCategories] = useState([]);
  const [filterName, setFilterName] = useState([false]);
  const [category, setCategory] = useState([]);
  const [modif, setModif] = useState([]);
  const [cat, setCat] = useState();
  const [catId, setCatId] = useState('');

  const handleChange = (index) => {
    const temp = [...modif];
    temp[index] = !temp[index];
    setModif(temp);
    setCat(categories[index].name);
    setCatId(categories[index].id);
  };

  const dataModif = {
    dataCat: cat,
  };

  const catSend = {
    dataCategory: category,
  };

  const modifyForm = (e, index) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', dataModif.dataCat);
    axios.post(`${url}/categories/update/${catId}`, data)
      .then((response) => {
        if (response.status === 200) {
          const catTemp = [...categories];
          catTemp[index].name = cat;
          setCategories(catTemp);
          handleChange(index);
        }
      });
  };

  useEffect(() => {
    axios.get(`${url}/categories`)
      .then((result) => {
        setCategories(result.data);
        setCatId(result.data.id);
        let temp = [];
        for (let i = 0; i <= result.data.length; i += 1) {
          temp = [...temp, false];
        }
        setModif(temp);
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', catSend.dataCategory);
    axios.post(`${url}/categories/`, data)
      .then((response) => {
        if (response.status === 201) {
          setCategories([...categories, {
            id: response.data.id,
            name: category,
          },
          ]);
        }
      });
  };

  const deleteRow = (e, index) => {
    e.preventDefault();
    const data = new FormData();
    data.append('index', index);
    axios.delete(`${url}/categories/${index}`, data)
      .then(() => {
        const delTemp = [...categories];
        delTemp.splice(index, 1);
        setCategories(delTemp);
      });
  };

  const filterCategory = (tag, [setFunc, param]) => {
    if (param) {
      setCategories(_.sortBy(categories, tag).reverse());
    } else {
      setCategories(_.sortBy(categories, tag).reverse());
    }
    setFunc(!param);
  };
  return (
    <div className="container" id="category-style">
      <h1>Catégories</h1>
      <form>
        <div className="form-row align-items-center catClass">
          <div className="col-6">
            <label className="sr-only" htmlFor="category">
              Catégorie
              <input type="text" className="form-control mb-2" id="category" onChange={e => setCategory(e.target.value)} placeholder="Nom de la catégorie" />
            </label>
          </div>
          <div className="col-3">
            <button type="submit" onClick={submit} className="button-style btn btn-success mb-2">Ajouter une catégorie</button>
          </div>
        </div>
      </form>
      <div className="table-style">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th onClick={() => filterCategory('name', [setFilterName, filterName])} className="col-6" scope="col">Catégories</th>
              <th className="col-3" scope="col">Editer</th>
              <th className="col-3" scope="col">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((catCategory, index) => (
              <tr key={[index]}>
                <th scope="row" width="50%">
                  {modif[index] ? (<input type="text" id="cat" name="cat" onChange={event => setCat(event.target.value)} value={cat} placeholder={category.name} />)
                    : (
                      <div>
                        {catCategory.name}
                        {modif[index]}
                      </div>
                    )
                  }
                </th>
                <td><button type="button" onClick={modif[index] ? event => modifyForm(event, index) : () => handleChange(index)} className="btn btn-primary btn-sm float-right">{modif[index] ? 'Valider' : 'Editer'}</button></td>
                <td><button type="button" onClick={e => deleteRow(e, category.id)} className="btn btn-primary btn-sm float-right">Supprimer</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;

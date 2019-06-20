import React, { useState, useEffect } from 'react';
import './Category.css';
import axios from 'axios';
import _ from 'underscore';


function Category() {
  const [categories, setCategories] = useState([]);
  const [filterName, setFilterName] = useState([false]);
  const [category, setCategory] = useState([]);
  const catSend = {
    category: category
  }
  useEffect(() => {
    axios.get('http://192.168.184.172:8000/categories')
      .then((result) => {
        setCategories(result.data);
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    console.log(catSend);
    axios.post('http://192.168.184.172:8000/categories/new', catSend)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
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
    <div id="category-style">
      <h1>Catégories</h1>
      <form>
        <div className="form-row align-items-center catClass">
          <div className="col-6">
            <label className="sr-only" htmlFor="category">Catégorie</label>
            <input type="text" className="form-control mb-2" id="category" onChange={e => setCategory(e.target.value)} placeholder="Nom de la catégorie" />
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
            {categories.map((category, index) => (
              <tr key={[index]}>
                <th scope="row" width="50%">{category.name}</th>
                <td><button type="button" className="btn btn-primary btn-sm float-right">Editer</button></td>
                <td><button type="button" className="btn btn-primary btn-sm float-right">Supprimer</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;

import React, { useState, useEffect } from 'react';
import './Category.css';
import axios from 'axios';
import _ from 'underscore';


function Category() {
  const [categories, setCategories] = useState([]);
  const [filterName, setFilterName] = useState([false]);
  useEffect(() => {
    axios.get('http://192.168.8.158:8000/categories')
      .then((result) => {
        setCategories(result.data);
      });
  }, []);

  const filterCategory = (tag, [setFunc, param]) => {
    if (param) {
      setCategories(_.sortBy(categories, tag).reverse());
    } else {
      setCategories(_.sortBy(categories, tag));
    }
    setFunc(!param);
  };
  return (
    <div id="category-style">
      <button type="button" className="button-style btn btn-success">Ajouter une catégorie</button>
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
                <th><button type="button" className="btn btn-primary btn-sm float-right">Editer</button></th>
                <th><button type="button" className="btn btn-primary btn-sm float-right">Supprimer</button></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;

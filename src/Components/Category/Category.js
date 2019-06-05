import React, {useState, useEffect} from 'react';
import './Category.css';
import axios from 'axios';

function Category(props) {

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/category')
      .then((result) => {
        setCategory(result.data);
      });
  }, []);

  return (
    <div className="tableStyle">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th className="col-6" scope="col">Catégorie</th>
            <th className="col-3" scope="col">Editer</th>
            <th className="col-3" scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {/*  {category.map(() => {
              return (
                <tr>
                  <th scope="row" width="50%">{}</th>
                  <td width="20%"> </td>
                  <button type="button" className="btn btn-primary btn-sm float-right">Editer</button>
                  <td width="20%"></td>
                  <button type="button" className="btn btn-primary btn-sm float-right">Supprimer</button>
                </tr>
              ); 
            })} */}
        </tbody>
      </table>
    </div>
  );
}

export default Category;

import React from 'react';
import './Category.css';

function Category() {
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

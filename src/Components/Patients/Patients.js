import React from 'react';
import './Patients.css';

function Patients() {
  return (
    <div className="container-fluid">
      <div className="tableStyle">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th className="col-2" scope="col">Prénom</th>
              <th className="col-2" scope="col">Nom</th>
              <th className="col-2" scope="col">Statut</th>
              <th className="col-2" scope="col">GIR</th>
              <th className="col-2" scope="col">Identifiant</th>
              <th className="col-2" scope="col">Ajouter</th>
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
    </div>
  );
}

export default Patients;

import React from 'react';
import './Login.css';

function Login() {
  return (
    <div id="form-style">
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Adresse e-mail</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Mot de passe</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Rester connecté</label>
        </div>
        <button type="submit" href="/RDV" className="btn btn-primary validation-button">Valider</button>
      </form>
    </div>
  );
}

export default Login;

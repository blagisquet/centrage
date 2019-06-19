import React from 'react';
import './Login.css';

function Login() {
  return (
    <div id="form-style">
      <form>
        <div className="form-group">
          <label htmlFor="email">
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
            Adresse e-mail
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <input type="password" className="form-control" id="password" placeholder="Password" />
            Mot de passe
          </label>
        </div>
        <div className="form-group form-check">
          <label className="form-check-label" htmlFor="check">
            <input type="checkbox" className="form-check-input" id="check" />
            Rester connecté
          </label>
        </div>
        <button type="submit" href="/RDV" className="btn btn-primary validation-button">Valider</button>
      </form>
    </div>
  );
}

export default Login;

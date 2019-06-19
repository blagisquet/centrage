import React from 'react';
import './NavbarAdmin.css';


function NavbarAdmin() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src="http://centrage.fr/wp-content/uploads/2019/05/logo-Centrage.jpg" alt="Centrage" />
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">.</span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link" href="/category">Catégorie</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/questions">Questions</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/patients">Patients</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/rdv">RDV</a>
          </li>
          <li className="nav-pill">
            <a className="nav-link login" href="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarAdmin;

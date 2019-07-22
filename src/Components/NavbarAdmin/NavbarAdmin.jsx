import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Category from '../Category/Category';
// import Login from '../Login/Login';
import Questions from '../Questions/Questions';
import Patients from '../Patients/Patients';
import Patient from '../Patient/Patient';
import RDV from '../RDV/RDV';
import Formulaire from '../Formulaire/Formulaire';
import ContextQuestions from '../Formulaire/ContextQuestions';
import SomeQuestions from '../Formulaire/SomeQuestions';
import './NavbarAdmin.css';

function NavbarAdmin() {
  return (
    <Router>
      <nav className="navbar fixed-top navbar-expand-xl navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <img src="http://centrage.fr/wp-content/uploads/2019/05/logo-Centrage.jpg" alt="Centrage" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">.</span>
        </button>
        <div className="collapse navbar-collapse bd-highlight" id="navbarNav">
          <ul className="nav nav-tabs">
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <Link to="/category" className="nav-link text-dark">Catégorie</Link>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <Link to="/questions" className="nav-link text-dark">Questions</Link>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <Link to="/clients" className="nav-link text-dark">Clients</Link>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <Link to="/rdv" className="nav-link text-dark">RDV</Link>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <Link to="/formulaire" className="nav-link text-dark">Formulaire</Link>
            </li>
            {/* <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
              <Link to="/login" className="nav-link text-dark">Login</Link>
            </li> */}
          </ul>
        </div>
      </nav>
      {/* <Route path="/login" exact component={Login} /> */}
      <Route path="/" exact component={RDV} />
      <Route path="/category" exact component={Category} />
      <Route path="/questions" exact component={Questions} />
      <Route path="/clients" exact component={Patients} />
      <Route path="/client/:id" exact component={Patient} />
      <Route path="/RDV" exact component={RDV} />
      <Route path="/formulaire" exact component={Formulaire} />
      <Route path="/formulaire/page2" exact component={ContextQuestions} />
      <Route path="/formulaire/page3" exact component={SomeQuestions} />
    </Router>
  );
}

export default NavbarAdmin;

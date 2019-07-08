import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavbarAdmin from './Components/NavbarAdmin/NavbarAdmin';
import Category from './Components/Category/Category';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Questions from './Components/Questions/Questions';
import Patients from './Components/Patients/Patients';
import Patient from './Components/Patient/Patient';
import RDV from './Components/RDV/RDV';

const App = () => (
  <div>
    <NavbarAdmin />
    <Route path="/login" component={Login} />
    <Route path="/homepage" component={Homepage} />
    <Route path="/category" component={Category} />
    <Route path="/questions" component={Questions} />
    <Route path="/clients" component={Patients} />
    <Route exact path="/client/:id" component={Patient} />
    <Route path="/RDV" component={RDV} />
  </div>
);

export default App;

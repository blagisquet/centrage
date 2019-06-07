import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavbarAdmin from './Components/NavbarAdmin/NavbarAdmin';
import Category from './Components/Category/Category';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Questions from './Components/Questions/Questions';
import Patients from './Components/Patients/Patients';
import RDV from './Components/RDV/RDV';


function App() {
  return (
    <div>
      <NavbarAdmin />
      <Route path="/login" exact component={Login} />
      <Route path="/homepage" exact component={Homepage} />
      <Route path="/category" exact component={Category} />
      <Route path="/questions" exact component={Questions} />
      <Route path="/patients" exact component={Patients} />
      <Route path="/RDV" exact component={RDV} />
    </div>
  );
}

export default App;

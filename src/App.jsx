import React from 'react';
import './App.css';
import NavbarAdmin from './Components/NavbarAdmin/NavbarAdmin';

const App = () => (
  <div>
    <NavbarAdmin />
    <Route path="/login" exact component={Login} />
    <Route path="/homepage" exact component={Homepage} />
    <Route path="/category" exact component={Category} />
    <Route path="/questions" exact component={Questions} />
    <Route path="/clients" exact component={Patients} />
    <Route path="/client/:id" exact component={Patient} />
    <Route path="/RDV" exact component={RDV} />
  </div>
);

export default App;

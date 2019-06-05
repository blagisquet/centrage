import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavbarAdmin from './Components/NavbarAdmin/NavbarAdmin';
import Category from './Components/Category/Category';


function App() {
  return (
    <div>
      <NavbarAdmin />
      <Route path="/category" exact component={Category} />
    </div>
  );
}

export default App;

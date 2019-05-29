import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './NavbarAdmin.css';


function NavbarAdmin() {
  return (
    <div>
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo"><img src="" alt="logo" /></a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">Menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="collapsible.html">Login/Logout</a></li>
          </ul>
        </div>
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab"><a href="#test1">Catégorie</a></li>
            <li className="tab"><a href="#test2">Questions</a></li>
            <li className="tab"><a href="#test3">Patients</a></li>
            <li className="tab"><a href="#test4">RDV</a></li>
          </ul>
        </div>
      </nav>
    <ul className="sidenav" id="mobile-demo">
      <li><a href="sass.html">Sass</a></li>
      <li><a href="badges.html">Components</a></li>
      <li><a href="collapsible.html">JavaScript</a></li>
    </ul>
   {/* <div id="test1" class="col s12">Test 1</div>
    <div id="test2" class="col s12">Test 2</div>
    <div id="test3" class="col s12">Test 3</div>
    <div id="test4" class="col s12">Test 4</div> */}
  </div>
  )
}

export default NavbarAdmin;

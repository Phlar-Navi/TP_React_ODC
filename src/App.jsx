import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Details from "./pages/Details"; // Assurez-vous d'importer vos composants
import Create from "./pages/Create";
import Logements from "./components/logements";
import logo from "./assets/logo.png"; // Assurez-vous d'avoir un fichier logo.png

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBarMenu />}>
          <Route path="/" element={<Logements />} /> {/* Route racine */}
          <Route path="/details" element={<Details />} />
          <Route path="/create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const NavBarMenu = () => {
  return (
    <>
      {/* Navbar Bootstrap fixée en haut et pleine largeur */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{" "}
          RealEstate
        </Link>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/details">
                  Details
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Create
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown link
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/details">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/create">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container" style={{ marginTop: "80px" }}>
        <Outlet /> {/* Ceci affiche les composants enfants des routes */}
      </div>
    </>
  );
};

export default App;
import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Details from "./pages/Details"; // Assurez-vous d'importer vos composants
import Create from "./pages/Create";
import Modify from "./pages/Modify";
import Logements from "./components/logements";
import logo from "./assets/logo.png"; // Assurez-vous d'avoir un fichier logo.png
import { createContext } from "react";

var listeLogements = [
    {
      id: 1,
      type: 'Appartement',
      nb_salons: 2,
      nb_douches: 2,
      nb_chambres: 3,
      nb_cuisines: 1,
      loyer: 50000,
      etat: "Occupe",
      adresse: "Rue Cleremont feront"
    },
    {
      id: 2,
      type: 'Duplex',
      nb_salons: 1,
      nb_douches: 2,
      nb_chambres: 4,
      nb_cuisines: 1,
      loyer: 200000,
      etat: "Occupe",
      adresse: "Rue Boulevard"
    }
]

function App() {
  return (
    <AppContext.Provider value={listeLogements}>
      <BrowserRouter>
        <Routes>
          <Route element={<NavBarMenu />}>
            <Route path="/" element={<Logements />} /> {/* Route racine */}
            <Route path={"/details/:id"} element={<Details />} />
            <Route path={"/modify/:id"} element={<Modify />} />
            <Route path="/create" element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}


var AppContext = createContext([]);

export { AppContext };


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
              {/* <li className="nav-item">
                <Link className="nav-link" to="/details">
                  Details
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Create
                </Link>
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
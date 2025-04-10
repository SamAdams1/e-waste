import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MapPage from "./components/MapPage";
import DatabasePage from "./components/DatabasePage";
import { map } from "leaflet";
import About from "./components/About";
import Admin from "./components/Admin";

const localKey = "ewasteCount";
function getData() {
  let localCount = localStorage.getItem(localKey);

  if (localCount) {
    console.log(localCount);
    return parseInt(localCount);
  } else {
    localStorage.setItem(localKey, "0");
    return 0;
  }
}

function App() {
  const [data, setData] = useState(getData);
  const [currentPage, setCurrentPage] = useState<keyof typeof pages>("database");

  const pages = {"map": <MapPage />, 
    "database": <DatabasePage />,
    "about": <About />,
    "admin": <Admin />,
  };

  useEffect(() => {
    localStorage.setItem(localKey, data.toString());
  }, [data]);

  return (
    <>
      <div className="header">
         <button onClick={() => setCurrentPage("about")} className="headerButton">
         <img
          src="/src/assets/snhuLogo.webp"
          alt="snhuLogo"
          className="snhuLogo"
        />
        <h1>EWaste</h1>
         </button>
        <div className="headerButtons">
          <a><button onClick={() => setCurrentPage("map")} className="headerButton">Map</button></a>
          <a><button onClick={() => setCurrentPage("database")} className="headerButton">Inventory</button></a>
          <a><button onClick={() => setCurrentPage("admin")} className="headerButton">Admin</button></a>
        </div>
      </div>
      <div>{pages[currentPage]}</div>
    </>
  );
}

export default App;

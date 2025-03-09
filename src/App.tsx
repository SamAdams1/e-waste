import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import MapPage from "./components/MapPage";
import DatabasePage from "./components/DatabasePage";

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
  const [count, setCount] = useState(getData);
  const [currentPage, setCurrentPage] = useState("map");

  useEffect(() => {
    localStorage.setItem(localKey, count.toString());
  }, [count]);

  return (
    <>
      <div className="header">
        <img
          src="/src/assets/snhuLogo.webp"
          alt="snhuLogo"
          className="snhuLogo"
        />
        <h1>SNHU E-Waste</h1>
        <div className="headerButtons">
          <button onClick={() => setCurrentPage("map")}>Map</button>
          <button onClick={() => setCurrentPage("database")}>Database</button>
        </div>
      </div>
      <div>{currentPage == "map" ? <MapPage /> : <DatabasePage />}</div>
    </>
  );
}

export default App;

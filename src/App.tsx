import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
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
  const [data, setData] = useState(getData);
  const [currentPage, setCurrentPage] = useState("database");

  useEffect(() => {
    localStorage.setItem(localKey, data.toString());
  }, [data]);

  return (
    <>
      <div className="header">
        <img
          src="/src/assets/snhuLogo.webp"
          alt="snhuLogo"
          className="snhuLogo"
        />
        <h1>EWaste</h1>
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

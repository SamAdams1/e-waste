import { useState, useEffect } from "react";
import { IEwaste } from "../models/Ewaste";
import Card from "./Card";

const databaseSchema = ["id", "type", "weight", "battery", "data_wiped", "bin"]; //column names

interface mongoResponse { ewaste: [IEwaste]}


const DatabasePage = () => {
  const [databaseData, setDatabaseData] = useState<[IEwaste]>();
  
  const getDatabaseData = async (): Promise<[IEwaste] | undefined> => {
    try {
      const response = await fetch("http://localhost:9090/ewaste/get");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: mongoResponse = await response.json();
      return data.ewaste;
    } 
    catch (error) {
      console.error(error);
      return undefined;
    }
  };

  // update a row's data
  const createEwaste = async (createFields: Partial<IEwaste>) => {
    try {
      const response = await fetch(`http://localhost:9090/ewaste/create`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createFields),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`Failed to create ewaste`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  function createFields() {
    const createFields = { type: "createlaptoptest", weight: 100, battery: true, data_wiped: true, bin: 7};
    createEwaste(createFields);
    // databaseData?.push(createFields)
    setTimeout(() => {
      fetchData()
    }, 100);
  }

  const fetchData = async () => {
    const data = await getDatabaseData();
    console.log(data)
    setDatabaseData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  return !databaseData ? (<>loading...</>) : (
    <div>
      <button onClick={createFields}>Create</button>
      <div className="table-container">
          {databaseData.map((obj, index) => (
            <div className="card" key={index + obj.type}>
            <Card
              key={index + obj.type}
              data={obj}
              fetchData={fetchData}
              />
              </div>
          ))}
      </div>
    </div>
  );
};

export default DatabasePage;

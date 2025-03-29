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
  const updateEwaste = async (id: string, updatedFields: Partial<IEwaste>) => {
    try {
      const response = await fetch(`http://localhost:9090/ewaste/update/${id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ewaste with id ${id}`);
      }
      // After update ok, refresh data. Is it ok to use it like this? What happens if it's not in useEffect, is it ok?
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    const data = await getDatabaseData();
    console.log(data)
    setDatabaseData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // "Update Record" button when clicked runs this
  const handleUpdateClick = (id: string) => {
    // Example update: put the variables in here in the future. For now it's just baked in data.
    const updatedFields = { type: "laptopiguess", weight: 100, battery: true, data_wiped: true, bin: 5 };
    updateEwaste(id, updatedFields);
  };

  return !databaseData ? (<>loading...</>) : (
    <div>
      <table>
        <tbody>
          <tr>
            {databaseSchema.map((columnName, index) => (
              <th key={columnName + index}>{columnName}</th>
            ))}
          </tr>
          {databaseData.map((obj, index) => (
            <tr key={index + obj.type}>
              <td>{index}</td>
                <Card
                  _id={obj._id}
                  type={obj.type}
                  weight={obj.weight}
                  battery={obj.battery}
                  bin={obj.bin}
                  data_wiped={obj.data_wiped}
                />
              <td>
                {/* Update Record button, run handleUpdateClick when clicked */}
                <button onClick={() => handleUpdateClick(obj._id)}>
                  Update Record
                </button>
              </td>
            </tr>
          ))}
          {/* {databaseData.length.map((row, rowIndex) => (
          <tr>
          {row.map((dataPoint, colIndex) => (
            <td key={`${rowIndex}-${colIndex}`}>{dataPoint + ""}</td>
          ))}
          </tr>
        ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default DatabasePage;

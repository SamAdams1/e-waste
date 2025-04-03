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

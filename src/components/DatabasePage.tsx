import { useState, useEffect } from "react";
import { IEwaste } from "../models/Ewaste";
import { error } from "console";
import { Interface } from "readline/promises";

const databaseSchema = ["id", "type", " weight", "battery", "data_wiped", "bin"] //column names

const dummyData = [
  [1, "laptop", 10, true, true, 2],
  [2, "phone", 1, true, false, 2],
  [3, "mouse", 0.5, true, true, 2]
]
interface mongoResponse { ewaste: [IEwaste]}

const DatabasePage = () => {
  const [databaseData, setDatabaseData] = useState<IEwaste[]>([]);
  
  const getDatabaseData = async (): Promise<[IEwaste] | undefined> => {
    try {
      const response = await fetch("http://localhost:9090/ewaste/get")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: mongoResponse = await response.json();
      return data.ewaste;
    } 
    catch(error) {
      console.error(error)
      return undefined
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDatabaseData();
      console.log(data)
      setDatabaseData(data);
    };
  
    fetchData();
  }, []);

  return !databaseData ? (<>loading</>) : (
    <div>
      <table>
        <tbody>
        <tr>
          {databaseSchema.map((columnName)=>(
            <th>{columnName}</th>
          ))}
        </tr>
          {databaseData.map( (obj, index) => (
        <tr key={index + obj.type}>
            <td>{index}</td>
            <td>{obj.type}</td>
            <td>{obj.weight}</td>
            <td>{obj.battery + ""}</td>
            <td>{obj.data_wiped + ""}</td>
            <td>{obj.bin}</td>
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

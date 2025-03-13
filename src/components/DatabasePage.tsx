import React from "react";

const databaseSchema = ["id", "type", " weight", "battery", "data_wiped", "bin"] //column names

const dummyData = [
  [1, "laptop", 10, true, true, 2],
  [2, "phone", 1, true, false, 2],
  [3, "mouse", 0.5, true, true, 2]
]

const DatabasePage = () => {
  return (
    <div>
      {/* <img src="src\assets\tablePlaceholder.png" alt="" /> */}
      <table>
        <tbody>

        <tr>
          {databaseSchema.map((columnName)=>{
            return <th>{columnName}</th>
          })}
        </tr>
        {dummyData.map((row, rowIndex) => (
          <tr>
          {row.map((dataPoint, colIndex) => (
            <td key={`${rowIndex}-${colIndex}`}>{dataPoint + ""}</td>
          ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatabasePage;

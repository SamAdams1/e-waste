import React, { useEffect, useState } from 'react'
import { IEwaste } from "../models/Ewaste";
import { parse } from 'path';


const Card = ({_id, type, weight, battery, data_wiped, bin}: IEwaste) => {
  const [editing, setEditing] = useState<boolean>(false);

  const [editType, setEditType] = useState(type);
  const [editWeight, setEditWeight] = useState<string>(weight + "");
  const [editBattery, setEditBattery] = useState(battery);
  const [editDataWiped, setEditDataWiped] = useState(data_wiped);
  const [editBin, setEditBin] = useState(bin + "");

  

  useEffect(()=> {

  }, [])

  function saveChanges() {
    // Send crud call to update the mongodb database
    const updatedFields = { type: editType, weight: parseInt(editWeight), battery: editBattery, data_wiped: editDataWiped, bin: parseInt(editBin)};
    updateEwaste(_id, updatedFields);

    // stop editing
    setEditing(false)
  }

  function cancelChanges() {
    // resets editState
    setEditType(type)
    setEditWeight(weight + "")
    setEditBattery(battery)
    setEditDataWiped(data_wiped)
    setEditBin(bin + "")

    setEditing(false)
  }

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
      // fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  
  // "Update Record" button when clicked runs this
  const handleUpdateClick = (id: string) => {
    // Example update: put the variables in here in the future. For now it's just baked in data.
    
  };

  return editing ? (
    <>
      <td><input type="text" value={editType} onChange={(e) => setEditType(e.target.value)}/></td>
      <td><input type="text" value={editWeight} onChange={(e) => setEditWeight(e.target.value)}/></td>
      <td><button onClick={()=>setEditBattery(!editBattery)}>{editBattery + ""}</button></td>
      <td><button onClick={()=>setEditDataWiped(!editDataWiped)}>{editDataWiped + ""}</button></td>
      <td><input type="text" value={editBin} onChange={(e) => setEditBin(e.target.value)}/></td>
      <td><button onClick={saveChanges}>save</button>
      <button onClick={cancelChanges}>cancel</button></td>
      
      <td>
        {/* Update Record button, run handleUpdateClick when clicked */}
        <button onClick={() => handleUpdateClick(_id)}>
          Update Record
        </button>
      </td>
    </>
  ) : (
    <>
      <td>{editType}</td>
      <td>{editWeight}</td>
      <td>{editBattery + ""}</td>
      <td>{editDataWiped + ""}</td>
      <td>{editBin}</td>
      <td><button onClick={()=>setEditing(true)}>edit</button></td>
    </>
  )
}

export default Card
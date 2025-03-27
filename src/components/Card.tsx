import React, { useEffect, useState } from 'react'
import { IEwaste } from "../models/Ewaste";


const Card = ({type, weight, battery, data_wiped, bin}: IEwaste) => {
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

  return editing ? (
    <>
      <td><input type="text" value={editType} onChange={(e) => setEditType(e.target.value)}/></td>
      <td><input type="text" value={editWeight} onChange={(e) => setEditWeight(e.target.value)}/></td>
      <td><button onClick={()=>setEditBattery(!editBattery)}>{editBattery + ""}</button></td>
      <td><button onClick={()=>setEditDataWiped(!editDataWiped)}>{editDataWiped + ""}</button></td>
      <td><input type="text" value={editBin} onChange={(e) => setEditBin(e.target.value)}/></td>
      <td><button onClick={saveChanges}>save</button>
      <button onClick={cancelChanges}>cancel</button></td>
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
import { useEffect, useState } from 'react'
import { IEwaste } from "../models/Ewaste";

interface CardProps {
  data: IEwaste;
  fetchData: () => Promise<void>;
}


const Card = ({ data, fetchData }: CardProps) => {
  const base = `http://${window.location.hostname}:9090`;
  const [editing, setEditing] = useState<boolean>(false);

  const [editType, setEditType] = useState(data.type);
  const [editWeight, setEditWeight] = useState<string>(data.weight + "");
  const [editBattery, setEditBattery] = useState(data.battery);
  const [editDataWiped, setEditDataWiped] = useState(data.data_wiped);
  const [editBin, setEditBin] = useState(data.bin + "");

  

  useEffect(()=> {

  }, [])

  function saveChanges() {
    // Send crud call to update the mongodb database
    const updatedFields = { type: editType, weight: parseFloat(editWeight), battery: editBattery, data_wiped: editDataWiped, bin: parseInt(editBin)};
    updateEwaste(updatedFields);

    // stop editing
    setEditing(false)
  }

  function cancelChanges() {
    // resets editState
    setEditType(data.type)
    setEditWeight(data.weight + "")
    setEditBattery(data.battery)
    setEditDataWiped(data.data_wiped)
    setEditBin(data.bin + "")

    setEditing(false)
  }

  
  // update a row's data
  const updateEwaste = async (updatedFields: Partial<IEwaste>) => {
    try {
      const response = await fetch(`${base}/ewaste/update/${data._id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ewaste with id ${data._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // update a row's data
  const deleteEwaste = async () => {
    try {
      const response = await fetch(`${base}/ewaste/delete/${data._id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete ewaste with id ${data._id}`);
      }
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      fetchData()
    }, 100);
  };
  
  return <>
  {editing ? (
    <>
      <div className="card-input">
        <label>Type:</label>
        <input type="text" value={editType} onChange={(e) => setEditType(e.target.value)} />
      </div>
      <div className="card-input">
        <label>Weight:</label>
        <input type="text" value={editWeight} onChange={(e) => setEditWeight(e.target.value)} />
      </div>
      <div className="card-input">
        <label>Battery:</label>
        <button onClick={() => setEditBattery(!editBattery)}>{editBattery ? "Yes" : "No"}</button>
      </div>
      <div className="card-input">
        <label>Data Wiped:</label>
        <button onClick={() => setEditDataWiped(!editDataWiped)}>{editDataWiped ? "Yes" : "No"}</button>
      </div>
      <div className="card-input">
        <label>Bin:</label>
        <input type="text" value={editBin} onChange={(e) => setEditBin(e.target.value)} />
      </div>
      <div className="card-actions">
        <button className="save-btn" onClick={saveChanges}>Save</button>
        <button className="cancel-btn" onClick={cancelChanges}>Cancel</button>
      </div>
    </>
  ) : (
    <>
        <div className="card-field">
          <strong>Type:</strong> {editType}
        </div>
        <div className="card-field">
          <strong>Weight:</strong> {editWeight} kg
        </div>
        <div className="card-field">
          <strong>Battery:</strong> {editBattery ? "Yes" : "No"}
        </div>
        <div className="card-field">
          <strong>Data Wiped:</strong> {editDataWiped ? "Yes" : "No"}
        </div>
        <div className="card-field">
          <strong>Bin:</strong> {editBin}
        </div>
        <div className="card-actions">
          <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
        </div>
    </>
  )}
  <button onClick={deleteEwaste}>Delete</button>
  </>
}

export default Card
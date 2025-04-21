import React, { useState, useEffect } from "react";
import { IEwaste } from "../models/Ewaste";
import Card from "./Card";
import Login from "./Login";

const databaseSchema = ["id", "type", "weight", "battery", "data_wiped", "bin"];

interface mongoResponse {
  ewaste: [IEwaste];
}

const DatabasePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [databaseData, setDatabaseData] = useState<IEwaste[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<IEwaste>>({
    type: "",
    weight: 0,
    battery: false,
    data_wiped: false,
    bin: 0,
  });

  const base = `http://${window.location.hostname}:9090`;

  const getDatabaseData = async (): Promise<[IEwaste] | undefined> => {
    try {
      const response = await fetch(`${base}/ewaste/get`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: mongoResponse = await response.json();
      return data.ewaste;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  const createEwaste = async (createFields: Partial<IEwaste>) => {
    try {
      const response = await fetch(`${base}/ewaste/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createFields),
      });
      if (!response.ok) {
        throw new Error(`Failed to create ewaste`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = () => {
    createEwaste(formData);
    setShowModal(false);
    fetchData();
  };

  const fetchData = async () => {
    const data = await getDatabaseData();
    setDatabaseData(data || []);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <div>
      <button onClick={() => setShowModal(true)}>Create</button>
      <div className="table-container">
        {databaseData.map((obj, index) => (
          <div className="card" key={index + obj.type}>
            <Card key={index + obj.type} data={obj} fetchData={fetchData} />
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Ewaste</h2>
            <form>
              <label>
                Type:
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                />
              </label>
              <label>
                Weight:
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: parseFloat(e.target.value) })
                  }
                />
              </label>
              <label>
                Battery:
                <input
                  type="checkbox"
                  checked={formData.battery}
                  onChange={(e) =>
                    setFormData({ ...formData, battery: e.target.checked })
                  }
                />
              </label>
              <label>
                Data Wiped:
                <input
                  type="checkbox"
                  checked={formData.data_wiped}
                  onChange={(e) =>
                    setFormData({ ...formData, data_wiped: e.target.checked })
                  }
                />
              </label>
              <label>
                Bin:
                <input
                  type="number"
                  value={formData.bin}
                  onChange={(e) =>
                    setFormData({ ...formData, bin: parseInt(e.target.value) })
                  }
                />
              </label>
            </form>
            <div className="modal-buttons">
              <button onClick={handleCreate}>Submit</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  );
};

export default DatabasePage;

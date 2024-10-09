import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Building {
  id: number;
  name: string;
  type: string;
}

const Buildings: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [newBuilding, setNewBuilding] = useState({ name: '', type: '' });

  useEffect(() => {
    // Fetch buildings from backend
    const fetchBuildings = async () => {
      const response = await axios.get('http://localhost:8000/buildings');
      setBuildings(response.data);
    };
    fetchBuildings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBuilding({ ...newBuilding, [name]: value });
  };

  const handleCreateBuilding = async () => {
    const response = await axios.post('http://localhost:8000/buildings', newBuilding);
    setBuildings([...buildings, response.data]);
  };

  return (
    <div>
      <h1>Buildings</h1>
      <ul>
        {buildings.map((building) => (
          <li key={building.id}>
            {building.name} - {building.type}
          </li>
        ))}
      </ul>

      <div>
        <h2>Add New Building</h2>
        <input
          type="text"
          name="name"
          placeholder="Building Name"
          value={newBuilding.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Building Type"
          value={newBuilding.type}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateBuilding}>Add Building</button>
      </div>
    </div>
  );
};

export default Buildings;

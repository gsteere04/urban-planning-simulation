import { useEffect, useState } from 'react';
import axios from 'axios';

interface Building {
    id: number;
    name: string;
    type: string;
}

const Buildings = () => { 
    const [buildings, setBuildings] = useState<Building[]>([]);

    useEffect(() => {
        axios.get<Building[]>('http://localhost:8000/api/buildings/')
        .then(response => {
            setBuildings(response.data);
        })
        .catch(error => {
            console.error('Error fetching buildings:', error);
        });
    }, []);

    return (
        <div>
            <h2>Buildings</h2>
            {buildings.map(building => (
                <div key={building.id}>
                    <h3>{building.name}</h3>
                    <p>{building.type}</p>
                </div>
            ))}
        </div>

    );
};

export default Buildings;

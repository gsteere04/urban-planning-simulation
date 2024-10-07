import React, { useEffect, useState } from 'react';
import { getPopulation, Population } from '../services/api';

const PopulationComponent: React.FC = () => {
  const [population, setPopulation] = useState<Population | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPopulation();
      setPopulation(data[0] || null);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>City Population</h2>
      {population ? (
        <p>Current Population: {population.count}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PopulationComponent;

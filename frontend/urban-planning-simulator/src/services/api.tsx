import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface Population {
    id: number;
    count: number;
    growth_rate: number;
}

export interface Building {
    id: number;
    name: string;
    type: string;
}

export const getPopulation = async (): Promise<Population[]> => {
    const response = await axios.get(`${API_URL}/population`);
    return response.data;
};

export const getBuildings = async (): Promise<Building[]> => {
    const response = await axios.get(`${API_URL}/buildings`);
    return response.data;
};

export const createPopulation = async (population: Population): Promise<Population> => {
    const response = await axios.post(`${API_URL}/population`, population);
    return response.data;
};

export const createBuilding = async (building: Building): Promise<Building> => {
    const response = await axios.post(`${API_URL}/buildings`, building);
    return response.data;
};

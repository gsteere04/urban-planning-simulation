export function createCity(size: number) {
    const data: { x: number, y: number, building: string }[][] = [];

    // Initialize the city with empty tiles
    for (let x = 0; x < size; x++) {
        const column: { x: number, y: number, building: string }[] = [];
        for (let y = 0; y < size; y++) {
            column.push({ x, y, building: '' }); // Initialize with empty buildings
        }
        data.push(column);
    }

    return {
        size,
        data
    };
}

export function placeBuilding(city: { size: number; data: { x:number; y: number; building: string }[][] }, x: number, y: number) {
    // Check if the coordinates are within the bounds of the city
    if (x >= 0 && x < city.size && y >= 0 && y < city.size) {
        // Update the building properly of the specified tile
        city.data[x][y].building = 'building';
    }
}

export function initialize(city: { size: number; data: { x: number; y: number; building: string }[][] }) {
    for (let x = 0; x < city.size; x++) {
        for (let y = 0; y < city.size; y++) {
            // Randomly decide whether to place a building
            if (Math.random() > 0.5) { // 50% chance to place a building
                city.data[x][y].building = 'building';
            } else {
                city.data[x][y].building = ''; // Empty tile
            }
        }
    }
}
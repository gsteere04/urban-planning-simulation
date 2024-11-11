export function createCity(size: number) {
    const data: { x: number, y: number }[][] = []; // specifies type for array data

    initialize();

    function initialize() {
        for (let x = 0; x < size; x++) {
            const column: { x: number, y: number }[] = []; // specifies type for array column
            for (let y = 0; y < size; y++) {
                const tile = { x, y };
                column.push(tile);
            }
            data.push(column);
        }
    }
    
    return {
        size,
        data
    }
}
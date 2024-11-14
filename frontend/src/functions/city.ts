export function createCity(size: number) {
    const data: { x: number, y: number, building: string }[][] = [];

    function initialize() {
        for (let x = 0; x < size; x++) {
            const column: { x: number, y: number, building: string }[] = [];
            for (let y = 0; y < size; y++) {
                const tile = { 
                    x, 
                    y,
                    building: Math.random() > 0.7 ? 'building' : ''
                };
                column.push(tile);
            }
            data.push(column);
        }
    }

    initialize();
    
    return {
        size,
        data
    }
}
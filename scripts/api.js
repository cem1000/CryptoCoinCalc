import { SHEETS_CONFIG } from './config.js';

export async function fetchTokenData() {
    try {
        const response = await fetch(SHEETS_CONFIG.URL);
        const text = await response.text();
        const jsonData = JSON.parse(text.substring(47).slice(0, -2));
        
        return jsonData.table.rows.map(row => ({
            name: row.c[2].v,
            ticker: row.c[1].v.toUpperCase(),
            currentPrice: row.c[3].v
        }));
    } catch (error) {
        console.error('Error fetching price data:', error);
        return null;
    }
} 
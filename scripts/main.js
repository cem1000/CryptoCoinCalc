import { fetchTokenData } from './api.js';
import { getDefaultTokens } from './tokens.js';
import { addCoin } from './ui.js';
import { initializeFloatingCoins } from './animations.js';

let AVAILABLE_TOKENS = [];

async function initializeApp() {
    // Clear loading message
    const container = document.getElementById('coins-container');
    container.innerHTML = '';

    try {
        // Fetch token data
        AVAILABLE_TOKENS = await fetchTokenData();
        
        if (AVAILABLE_TOKENS) {
            // Create datalist for searchable tokens
            const datalist = document.createElement('datalist');
            datalist.id = 'available-coins';
            const uniqueCoins = [...new Set(AVAILABLE_TOKENS.map(t => t.name))];
            uniqueCoins.forEach(coinName => {
                const option = document.createElement('option');
                option.value = coinName;
                datalist.appendChild(option);
            });
            document.body.appendChild(datalist);

            // Initialize with default tokens
            const defaultTokens = getDefaultTokens(AVAILABLE_TOKENS);
            defaultTokens.forEach(token => addCoin(token));
        } else {
            throw new Error('Failed to fetch token data');
        }
    } catch (error) {
        console.error('Initialization error:', error);
        container.innerHTML = `
            <div class="error-message">
                Failed to load price data. Please try refreshing the page.
                <button onclick="window.location.reload()">Refresh</button>
            </div>
        `;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners
    document.getElementById('add-coin').addEventListener('click', () => addCoin());
    
    // Initialize floating background
    initializeFloatingCoins();
    
    // Start the app
    initializeApp();
});

// Export for use in other modules if needed
export { AVAILABLE_TOKENS }; 
import { createCoin, coins } from './tokens.js';
import { WORTH_RANGES, getRandomMessage } from './config.js';
import { AVAILABLE_TOKENS } from './main.js';

function formatNumber(num) {
    if (!num && num !== 0) return '';
    const number = Number(num);
    if (isNaN(number)) return '';
    
    // Handle different decimal places based on size
    if (number >= 1) {
        return number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    } else {
        return number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8
        });
    }
}

function parseFormattedNumber(str) {
    if (!str) return '0';
    // Remove commas and any other non-numeric characters except decimal point
    const cleaned = str.toString().replace(/[^0-9.-]/g, '');
    return cleaned || '0';
}

function createColumnHeaders() {
    const headers = document.createElement('div');
    headers.className = 'row mb-3 text-center';
    headers.innerHTML = `
        <div class="col-4">Token Name</div>
        <div class="col-3">Amount</div>
        <div class="col-3">Price Target ($)</div>
        <div class="col-2">Price Mode</div>
    `;
    return headers;
}

export function createCoinElement(coin) {
    const div = document.createElement('div');
    div.className = 'coin-row';
    div.innerHTML = `
        <div class="input-section">
            <label class="d-md-none">Token Name</label>
            <input type="text" 
                class="name-input form-control" 
                placeholder="Search token..." 
                list="available-coins"
                autocomplete="off"
                value="${coin.name || ''}">
        </div>
        <div class="input-section">
            <label class="d-md-none">Amount</label>
            <input type="text" 
                class="holdings-input form-control" 
                placeholder="Enter amount" 
                value="${formatNumber(coin.holdings || '')}">
        </div>
        <div class="input-section">
            <label class="d-md-none">Price<br>Target ($)</label>
            <input type="text" 
                class="price-input form-control" 
                placeholder="Target price" 
                ${!coin.useCustomPrice ? 'readonly' : ''}
                value="${formatNumber(coin.targetPrice || '')}">
            <div class="multiplier-buttons">
                ${[2, 5, 10, 100].map(mult => 
                    `<button class="multiplier-btn">${mult}x</button>`
                ).join('')}
            </div>
        </div>
        <div class="input-section">
            <label class="d-md-none">Price<br>Mode</label>
            <div class="toggle-wrapper">
                <span class="toggle-label">${coin.useCustomPrice ? 'Custom' : 'Current'}</span>
                <div class="toggle-price ${coin.useCustomPrice ? 'active' : ''}" 
                    title="Toggle custom price"></div>
            </div>
        </div>
        <button class="delete-coin" title="Remove token">×</button>
    `;

    const nameInput = div.querySelector('.name-input');
    const holdingsInput = div.querySelector('.holdings-input');
    const priceInput = div.querySelector('.price-input');
    const togglePrice = div.querySelector('.toggle-price');
    const toggleLabel = div.querySelector('.toggle-label');

    nameInput.value = coin.name;
    holdingsInput.value = formatNumber(coin.holdings);
    priceInput.value = formatNumber(coin.targetPrice);

    // Toggle price input
    togglePrice.addEventListener('click', () => {
        coin.useCustomPrice = !coin.useCustomPrice;
        togglePrice.classList.toggle('active');
        priceInput.readOnly = !coin.useCustomPrice;
        toggleLabel.textContent = coin.useCustomPrice ? 'Custom' : 'Current';
        if (!coin.useCustomPrice) {
            priceInput.value = formatNumber(coin.currentPrice);
            coin.targetPrice = coin.currentPrice;
        }
        updateTotal();
    });

    // Input event listeners
    const inputs = [nameInput, holdingsInput, priceInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input === nameInput) {
                const selectedToken = AVAILABLE_TOKENS.find(t => t.name === nameInput.value);
                if (selectedToken) {
                    coin.name = selectedToken.name;
                    coin.currentPrice = Number(selectedToken.currentPrice);
                    if (!coin.useCustomPrice) {
                        coin.targetPrice = Number(selectedToken.currentPrice);
                        priceInput.value = formatNumber(coin.targetPrice);
                    }
                }
            } else if (input === holdingsInput) {
                const rawValue = parseFormattedNumber(holdingsInput.value);
                coin.holdings = Number(rawValue);
                console.log('Updated holdings:', coin.holdings); // Debug
            } else if (input === priceInput && coin.useCustomPrice) {
                const rawValue = parseFormattedNumber(priceInput.value);
                coin.targetPrice = Number(rawValue);
                console.log('Updated target price:', coin.targetPrice); // Debug
            }
            updateTotal();
        });
    });

    // Multiplier buttons
    div.querySelectorAll('.multiplier-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!coin.useCustomPrice) {
                coin.useCustomPrice = true;
                togglePrice.classList.add('active');
                priceInput.readOnly = false;
                toggleLabel.textContent = 'Custom';
            }
            const mult = Number(btn.textContent.replace('x', ''));
            coin.targetPrice = Number(coin.currentPrice) * mult;
            priceInput.value = formatNumber(coin.targetPrice);
            console.log('Updated price after multiplier:', coin.targetPrice); // Debug
            updateTotal();
        });
    });

    // Add delete functionality
    const deleteBtn = div.querySelector('.delete-coin');
    deleteBtn.addEventListener('click', () => {
        div.remove();
        const index = coins.findIndex(c => c.id === coin.id);
        if (index > -1) {
            coins.splice(index, 1);
        }
        updateTotal();
    });

    return div;
}

export function updateTotal() {
    console.log('Calculating total...'); // Debug
    console.log('Current coins:', coins); // Debug - see all coins

    const total = coins.reduce((sum, coin) => {
        // Log raw values before parsing
        console.log('Raw values:', {
            name: coin.name,
            holdings: coin.holdings,
            targetPrice: coin.targetPrice,
            type: {
                holdings: typeof coin.holdings,
                targetPrice: typeof coin.targetPrice
            }
        });

        const holdings = Number(coin.holdings) || 0;
        const targetPrice = Number(coin.targetPrice) || 0;
        const subtotal = holdings * targetPrice;

        console.log('Calculated values:', {
            holdings,
            targetPrice,
            subtotal
        });

        return sum + subtotal;
    }, 0);

    console.log('Final total:', total); // Debug

    const totalElement = document.getElementById('total');
    totalElement.innerHTML = `
        <div class="total-amount">$${formatNumber(total)}</div>
        <div class="worth-message">${getWorthMessage(total)}</div>
    `;
}

export function getWorthMessage(total) {
    const range = WORTH_RANGES.find(r => total <= r.max);
    return range ? getRandomMessage(range) : "Even Elon is jealous! 🚀";
}

export function addCoin(defaultToken = null) {
    const coin = createCoin(defaultToken);
    coins.push(coin);
    const coinElement = createCoinElement(coin);
    document.getElementById('coins-container').appendChild(coinElement);
} 
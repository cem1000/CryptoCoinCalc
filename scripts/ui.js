import { createCoin, coins } from './tokens.js';
import { WORTH_RANGES } from './config.js';
import { AVAILABLE_TOKENS } from './main.js';

export function createCoinElement(coin) {
    const div = document.createElement('div');
    div.className = 'coin-row';
    div.innerHTML = `
        <div class="input-group">
            <label class="input-label">Token Name</label>
            <input type="text" 
                placeholder="Type to search..." 
                class="name-input" 
                list="available-coins"
                autocomplete="off">
        </div>
        <div class="input-group">
            <label class="input-label">Amount</label>
            <input type="number" placeholder="Amount" class="holdings-input">
        </div>
        <div class="input-group">
            <label class="input-label">Price Target ($)</label>
            <input type="number" placeholder="Target $" class="price-input" 
                ${!coin.useCustomPrice ? 'readonly' : ''} 
                value="${coin.targetPrice}">
            <div class="multiplier-buttons">
                ${[2, 5, 10, 100].map(mult => 
                    `<button class="multiplier-btn">${mult}x</button>`
                ).join('')}
            </div>
        </div>
        <div class="price-toggle-group">
            <label class="input-label">Price Mode</label>
            <div class="toggle-wrapper">
                <span class="toggle-label">${coin.useCustomPrice ? 'Custom' : 'Current'}</span>
                <div class="toggle-price ${coin.useCustomPrice ? 'active' : ''}" title="Toggle custom price"></div>
            </div>
        </div>
        <button class="delete-coin" title="Remove coin">×</button>
    `;

    const nameInput = div.querySelector('.name-input');
    const holdingsInput = div.querySelector('.holdings-input');
    const priceInput = div.querySelector('.price-input');
    const togglePrice = div.querySelector('.toggle-price');
    const toggleLabel = div.querySelector('.toggle-label');

    nameInput.value = coin.name;
    holdingsInput.value = coin.holdings;
    priceInput.value = coin.targetPrice;

    // Toggle price input
    togglePrice.addEventListener('click', () => {
        coin.useCustomPrice = !coin.useCustomPrice;
        togglePrice.classList.toggle('active');
        priceInput.readOnly = !coin.useCustomPrice;
        toggleLabel.textContent = coin.useCustomPrice ? 'Custom' : 'Current';
        if (!coin.useCustomPrice) {
            priceInput.value = coin.currentPrice;
            coin.targetPrice = coin.currentPrice;
        }
        updateTotal();
    });

    // Input event listeners
    const inputs = [nameInput, holdingsInput, priceInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const selectedToken = AVAILABLE_TOKENS.find(t => t.name === nameInput.value);
            if (selectedToken) {
                coin.name = selectedToken.name;
                coin.currentPrice = selectedToken.currentPrice;
                if (!coin.useCustomPrice) {
                    coin.targetPrice = selectedToken.currentPrice;
                    priceInput.value = selectedToken.currentPrice;
                }
                updateTotal();
            }
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
            const mult = parseInt(btn.textContent);
            priceInput.value = coin.currentPrice * mult;
            coin.targetPrice = priceInput.value;
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
    const total = coins.reduce((sum, coin) => {
        return sum + (parseFloat(coin.holdings || 0) * parseFloat(coin.targetPrice || 0));
    }, 0);
    
    const totalElement = document.getElementById('total');
    totalElement.innerHTML = `
        <div class="total-amount">$${total.toLocaleString()}</div>
        <div class="worth-message">${getWorthMessage(total)}</div>
    `;
}

export function getWorthMessage(total) {
    const range = WORTH_RANGES.find(r => total <= r.max);
    return range ? range.message : "WAGMI! 🚀";
}

export function addCoin(defaultToken = null) {
    const coin = createCoin(defaultToken);
    coins.push(coin);
    const coinElement = createCoinElement(coin);
    document.getElementById('coins-container').appendChild(coinElement);
} 
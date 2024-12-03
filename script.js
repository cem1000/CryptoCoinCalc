// Fetch prices from Google Sheets
const SHEETS_ID = '1kDaaM9Z6_xwDKH5nniMX4hA128Gi2CTOz29Siagx-Dw';
const SHEET_NAME = 'PriceData'; // Update this if your sheet name is different
const SHEETS_URL = `https://docs.google.com/spreadsheets/d/${SHEETS_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

// Initialize tokens array
let AVAILABLE_TOKENS = [];
let DEFAULT_TOKENS = [];

// Fetch data before initializing the app
async function initializeApp() {
    try {
        const response = await fetch(SHEETS_URL);
        const text = await response.text();
        // Google's response comes with some extra characters we need to remove
        const jsonData = JSON.parse(text.substring(47).slice(0, -2));
        
        // Process the data
        AVAILABLE_TOKENS = jsonData.table.rows.map(row => ({
            name: row.c[2].v, // coin_name
            ticker: row.c[1].v.toUpperCase(), // coin_ticker
            currentPrice: row.c[3].v // coin_price
        }));

        // Set default tokens (BTC, ETH, DOGE)
        DEFAULT_TOKENS = [
            { 
                name: `Bitcoin (${AVAILABLE_TOKENS[0].ticker})`, 
                currentPrice: AVAILABLE_TOKENS[0].currentPrice, 
                defaultHoldings: 1 
            },
            { 
                name: `Ethereum (${AVAILABLE_TOKENS[1].ticker})`, 
                currentPrice: AVAILABLE_TOKENS[1].currentPrice, 
                defaultHoldings: 10 
            },
            {
                name: `Dogecoin (DOGE)`, 
                currentPrice: AVAILABLE_TOKENS.find(t => t.ticker === 'DOGE')?.currentPrice || 0.15,
                defaultHoldings: 1000
            }
        ];

        // Initialize the app with default tokens
        DEFAULT_TOKENS.forEach(token => addCoin(token));
    } catch (error) {
        console.error('Error fetching price data:', error);
        // Fallback to default values if fetch fails
        DEFAULT_TOKENS = [
            { name: 'Bitcoin (BTC)', currentPrice: 50000, defaultHoldings: 1 },
            { name: 'Ethereum (ETH)', currentPrice: 3000, defaultHoldings: 10 },
            { name: 'Dogecoin (DOGE)', currentPrice: 0.15, defaultHoldings: 1000 }
        ];
        DEFAULT_TOKENS.forEach(token => addCoin(token));
    }
}

let coins = [];
let coinId = 0;

function createCoin(defaultToken = null) {
    coinId++;
    return {
        id: coinId,
        name: defaultToken ? defaultToken.name : '',
        holdings: defaultToken ? defaultToken.defaultHoldings : '',
        targetPrice: defaultToken ? defaultToken.currentPrice : '',
        currentPrice: defaultToken ? defaultToken.currentPrice : '',
        useCustomPrice: false
    };
}

function createCoinElement(coin) {
    const div = document.createElement('div');
    div.className = 'coin-row';
    div.innerHTML = `
        <div class="input-group">
            <label class="input-label">Token Name</label>
            <input type="text" placeholder="Token Name" class="name-input" ${coin.currentPrice ? 'readonly' : ''}>
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
            <span class="toggle-label">${coin.useCustomPrice ? 'Custom' : 'Current'}</span>
            <div class="toggle-price ${coin.useCustomPrice ? 'active' : ''}" title="Toggle custom price"></div>
        </div>
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
            coin.name = nameInput.value;
            coin.holdings = holdingsInput.value;
            if (coin.useCustomPrice) {
                coin.targetPrice = priceInput.value;
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
            const mult = parseInt(btn.textContent);
            priceInput.value = coin.currentPrice * mult;
            coin.targetPrice = priceInput.value;
            updateTotal();
        });
    });

    return div;
}

function updateTotal() {
    const total = coins.reduce((sum, coin) => {
        return sum + (parseFloat(coin.holdings || 0) * parseFloat(coin.targetPrice || 0));
    }, 0);
    document.getElementById('total').textContent = `$${total.toLocaleString()}`;
}

function addCoin(defaultToken = null) {
    const coin = createCoin(defaultToken);
    coins.push(coin);
    const coinElement = createCoinElement(coin);
    document.getElementById('coins-container').appendChild(coinElement);
}

// Crypto icons for floating background
const CRYPTO_ICONS = [
    'images/btc.png',
    'images/eth.png',
    'images/doge.png',
    'images/cardano.png',
    'images/eth2.png',
    'images/grt.png',
    'images/matic.png'
];

// Initialize floating coins background
const floatingCoins = document.getElementById('floating-coins');
for (let i = 0; i < 100; i++) {
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.style.left = `${Math.random() * 100}%`;
    coin.style.top = `${Math.random() * 100}%`;
    coin.style.backgroundImage = `url(${CRYPTO_ICONS[i % CRYPTO_ICONS.length]})`;
    coin.style.animationDelay = `${Math.random() * 5}s`;
    coin.style.animationDuration = `${10 + Math.random() * 10}s`;
    floatingCoins.appendChild(coin);
}

// Initialize with default tokens
document.getElementById('add-coin').addEventListener('click', () => addCoin());
initializeApp(); 
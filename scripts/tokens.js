let coins = [];
let coinId = 0;

export function createCoin(defaultToken = null) {
    coinId++;
    const coin = {
        id: coinId,
        name: defaultToken ? defaultToken.name : '',
        holdings: defaultToken ? Number(defaultToken.defaultHoldings) : 0,
        targetPrice: defaultToken ? Number(defaultToken.currentPrice) : 0,
        currentPrice: defaultToken ? Number(defaultToken.currentPrice) : 0,
        useCustomPrice: false
    };
    console.log('Created new coin:', coin); // Debug
    return coin;
}

export function getDefaultTokens(availableTokens) {
    return [
        { 
            name: availableTokens.find(t => t.name === 'Bitcoin')?.name || 'Bitcoin',
            currentPrice: availableTokens.find(t => t.name === 'Bitcoin')?.currentPrice || 50000,
            defaultHoldings: 1 
        },
        { 
            name: availableTokens.find(t => t.name === 'Ethereum')?.name || 'Ethereum',
            currentPrice: availableTokens.find(t => t.name === 'Ethereum')?.currentPrice || 3000,
            defaultHoldings: 10 
        },
        {
            name: availableTokens.find(t => t.name === 'Dogecoin')?.name || 'Dogecoin',
            currentPrice: availableTokens.find(t => t.name === 'Dogecoin')?.currentPrice || 0.15,
            defaultHoldings: 1000
        }
    ];
}

export { coins }; 
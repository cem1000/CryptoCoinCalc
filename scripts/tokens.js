let coins = [];
let coinId = 0;

export function createCoin(defaultToken = null) {
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
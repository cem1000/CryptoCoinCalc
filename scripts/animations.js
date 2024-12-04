import { CRYPTO_ICONS } from './config.js';

export function initializeFloatingCoins() {
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
} 
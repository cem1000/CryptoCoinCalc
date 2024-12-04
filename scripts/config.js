// Configuration and constants
export const SHEETS_CONFIG = {
    ID: '1kDaaM9Z6_xwDKH5nniMX4hA128Gi2CTOz29Siagx-Dw',
    SHEET_NAME: 'PriceData',
    get URL() {
        return `https://docs.google.com/spreadsheets/d/${this.ID}/gviz/tq?tqx=out:json&sheet=${this.SHEET_NAME}`;
    }
};

export const CRYPTO_ICONS = [
    'images/btc.png',
    'images/eth.png',
    'images/doge.png',
    'images/cardano.png',
    'images/eth2.png',
    'images/grt.png',
    'images/matic.png'
];

export const WORTH_RANGES = [
    { max: 100, message: "Maybe stick to mining faucets for now... 🚰" },
    { max: 1000, message: "You can buy some decent NFTs... if it was 2021! 🖼️" },
    { max: 10000, message: "Nice! You can afford a decent mining rig! ⛏️" },
    { max: 50000, message: "You could start your own NFT collection! 🎨" },
    { max: 100000, message: "Time to quit your job and become a full-time trader! 📈" },
    { max: 500000, message: "You can now afford your own crypto startup! 🚀" },
    { max: 1000000, message: "Welcome to the 7-figure crypto club! Lambo time! 🏎️" },
    { max: 5000000, message: "You can now buy an entire Bitcoin mining farm! ⚡" },
    { max: 10000000, message: "Time to buy that private island for your crypto hub 🏝️" },
    { max: 50000000, message: "You could start your own cryptocurrency! 💎" },
    { max: 100000000, message: "Congratulations! You're now a crypto whale! 🐋" },
    { max: 500000000, message: "You could buy multiple crypto exchanges! 🏦" },
    { max: 1000000000, message: "Billionaire's club! Time to compete with CZ! 👑" },
    { max: Infinity, message: "Hello Satoshi, is that you? 😎" }
]; 
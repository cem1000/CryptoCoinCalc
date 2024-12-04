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
    { 
        max: 100,
        messages: [
            "Still eating instant ramen? Bullish! 🍜",
            "Your portfolio is smaller than gas fees ⛽",
            "Have you tried turning it off and on again? 🔌",
            "Time to sell your kidney? (Not financial advice) 🫘",
            "1 DOGE = 1 DOGE (but you can't afford one) 🐕"
        ]
    },
    {
        max: 1000,
        messages: [
            "Wen Honda Civic? 🚗",
            "Almost enough for a jpeg of a monkey! 🐒",
            "Your portfolio is now worth one GPU fan 🌪️",
            "Time to start a YouTube crypto channel! 🎥",
            "HODL game weak but spirit strong 💪"
        ]
    },
    {
        max: 10000,
        messages: [
            "Wen Ramen upgrade to Sushi? 🍣",
            "Time to quit your job! (jk keep mining fiat) 💼",
            "Almost break-even from your 2021 buys! 📈",
            "Starting to feel like Michael Saylor (at home) 🏠",
            "Wen Toyota? 🚙"
        ]
    },
    {
        max: 50000,
        messages: [
            "Getting ready to post 'GM' every day 🌅",
            "Time to add 'crypto entrepreneur' to bio ✍️",
            "Wen Tesla? vrooooom.tesla.com 🚗",
            "Starting to understand what WAGMI means 🚀",
            "Your wife's boyfriend might let you eat at the table now 🍽️"
        ]
    },
    {
        max: 100000,
        messages: [
            "Wen Lambo? Soon™ 🏎️",
            "Time to tell your boss what you really think (in draft) 📝",
            "Almost enough to recover from your leverage trades! 📊",
            "Wen Ferrari? configurator.ferrari.com 🏎️",
            "Starting to feel like a proper degen 🎰"
        ]
    },
    {
        max: 500000,
        messages: [
            "Wen private island? privateislands.com 🏝️",
            "Time to start your own 'not a ponzi' scheme! 🔺",
            "Your portfolio is worth more than LUNA 2.0 🌙",
            "Officially qualified to give bad financial advice 📈",
            "Wen mansion? zillow.com/mansion 🏰"
        ]
    },
    {
        max: 1000000,
        messages: [
            "Wen space trip with Elon? 🚀",
            "Time to start your own blockchain (with blackjack) ♠️",
            "Officially a crypto millionaire (until tomorrow) 📉",
            "Wen buy Twitter? (cheaper than before) 🐦",
            "Time to start DMing celebs about your NFT project 💫"
        ]
    },
    {
        max: Infinity,
        messages: [
            "Hello Mr. Nakamoto, is that you? 👀",
            "CZ wants to know if you're hiring 💼",
            "Time to create your own country! 🏴‍☠️",
            "Even FTX can't lose this much! 🎰",
            "Instructions unclear: accidentally bought Amazon 🛍️"
        ]
    }
];

// Function to get a random message for a range
export function getRandomMessage(range) {
    return range.messages[Math.floor(Math.random() * range.messages.length)];
} 
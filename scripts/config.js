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

// The stages of crypto grief, now with more precision and pain
export const WORTH_RANGES = [
    {
        max: 10,
        messages: [
            "Congratulations! You can afford 0.0000001% of a Bitcoin transaction fee! 🎉",
            "Your portfolio is worth less than a McDonald's ice cream machine (when it's broken) 🍦",
            "Even LUNA investors are laughing at you 😅",
            "Have you considered investing in magic beans instead? 🫘",
            "This is definitely the bottom (narrator: it wasn't) 📉"
        ]
    },
    {
        max: 50,
        messages: [
            "You could buy half a pizza! (Not the Bitcoin pizza, obviously) 🍕",
            "Your portfolio is worth exactly one crypto conference coffee ☕",
            "Still more valuable than SafeMoon's promises 🌙",
            "Even Dogecoin wouldn't bark at this 🐕",
            "Achievement unlocked: Micro-micro-micro whale 🐋"
        ]
    },
    {
        max: 100,
        messages: [
            "You can now afford to lose twice as much! 📊",
            "Whale alert: Someone moved $100 worth of crypto (it's you) 🚨",
            "Your portfolio is now worth one NFT pixel 🎨",
            "Time to start a 'How I turned $100 into $0' YouTube series 🎥",
            "This is basically a rounding error on Mt. Gox's books 📚"
        ]
    },
    {
        max: 500,
        messages: [
            "Almost enough for one Ethereum gas fee (during off-peak hours) ⛽",
            "You could buy a hardware wallet! (To store your debt) 💾",
            "Time to start your crypto tax evasion strategy (jk, IRS) 📋",
            "Your portfolio is worth one conference ticket (standing room only) 🎫",
            "Achievement unlocked: Plankton status 🦠"
        ]
    },
    {
        max: 1000,
        messages: [
            "You can now afford to join a DAO (that's definitely not a Discord group) 👥",
            "Time to add 'crypto visionary' to your Twitter bio 🐦",
            "Almost enough to buy the dip (of the dip of the dip) 📉",
            "Your portfolio is worth one VIP dinner with Carlos Matos 🍽️",
            "Hey hey heeeey... you're still poor 👋"
        ]
    },
    {
        max: 5000,
        messages: [
            "Officially qualified to give financial advice (in the metaverse) 🎮",
            "Time to start your own technical analysis channel (just draw random lines) 📈",
            "You could buy a used mining rig from 2017! (Still not profitable) ⛏️",
            "Almost enough to recover from your SafeMoon investment 🌙",
            "Achievement unlocked: Baby Shark 🦈"
        ]
    },
    {
        max: 10000,
        messages: [
            "Time to tell your parents you're a 'blockchain entrepreneur' 👔",
            "You could buy a course on how to lose money faster! 📚",
            "Almost enough to start your own exchange (that's definitely not a scam) 💱",
            "Your portfolio is worth one dinner with Peter Schiff (he'll still hate Bitcoin) 🍽️",
            "Achievement unlocked: Dolphin (at home) 🐬"
        ]
    },
    {
        max: 50000,
        messages: [
            "Time to start your own coin (ElonCumRocket69Inu) 🚀",
            "You could buy a used Lambo! (Hot Wheels edition) 🏎️",
            "Almost enough to recover from your ICP investment 🤡",
            "Your portfolio is worth one Bitcoin maximalist's monthly coffee budget ☕",
            "Achievement unlocked: Shark (in a kiddie pool) 🦈"
        ]
    },
    {
        max: 100000,
        messages: [
            "Time to start your own country (in the metaverse) 🏴‍☠️",
            "You could buy Twitter! (A Twitter bot, that is) 🤖",
            "Almost enough to make Michael Saylor notice you 👀",
            "Your portfolio is worth one Crypto Punk's left eyebrow 👁️",
            "Achievement unlocked: Baby Whale (still drinks milk) 🐋"
        ]
    },
    {
        max: 500000,
        messages: [
            "Time to start your own blockchain (now with extra buzzwords) 🔗",
            "You could buy a house! (in Decentraland) 🏠",
            "Almost enough to make CZ follow you back 🤝",
            "Your portfolio is worth one SEC fine (rookie numbers) 💸",
            "Achievement unlocked: Whale (at SeaWorld) 🐋"
        ]
    },
    {
        max: 1000000,
        messages: [
            "Congratulations! You're now officially 'crypto rich' (poor in fiat) 🎉",
            "Time to start your own hedge fund (Sir, this is a Wendy's) 💼",
            "You could buy FTX! (Too soon?) 💣",
            "Your portfolio is worth one of Do Kwon's daily legal fees ⚖️",
            "Achievement unlocked: Moby Dick's cousin twice removed 🐳"
        ]
    },
    {
        max: Infinity,
        messages: [
            "Error 404: Bank account too large to compute 🤯",
            "Even Satoshi is sliding into your DMs 📱",
            "Time to buy El Salvador (the whole country) 🌎",
            "Your portfolio is worth more than common sense 🧠",
            "Achievement unlocked: Final Boss - Satoshi's true identity revealed 🎮"
        ]
    }
];

// Function to get a random message for a range
export function getRandomMessage(range) {
    return range.messages[Math.floor(Math.random() * range.messages.length)];
} 
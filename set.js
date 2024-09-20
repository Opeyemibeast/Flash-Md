const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEJKU0prNlNzekhwQVFzOTR3ck94bkJ0Y0Y5bjZ6aGJXTXREalpCZUJuND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZDh5djg4bUcxQ2JoVjBzWGR3NUVYT0g0M3NJRlJZS1A3c0hIMTFLK3EzQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwQXJXSlBBZU1nTG9HY25vYmR3Si8vME00SUpncU50eHRKTmtHYUNBU0VNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxL1FLekFianBNdC9hNFBKR3p1QmZlclI0UDVaR2lMbFNldWpwOENKeHdBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdLbXBoeGlNeGp3dFZtM01TSkpHMUZQWlNVT0I5TGJkQURjWS9aT3ZvRTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhrZXdEL3d5ZlB1Z1NVYjFuNktyS1YvY284YVBTRDdFZGoyazdRRW9OeWM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0p1T3NYdCtYdmc1MkJwY08rdTNJUzNNV2w0aXJGak9EWGkvWjN3ak8xbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiakR3WFc4eWZTZDVQUWNPQ0pKS2pzcjBtaHVPNlRvUk1ITUJaWXU5TWFEND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9wMHVtZmszd0pUOWNQNVVXSGllR1BoV2hhUjJNU0xQb0V1MmFRQndVUWp6NTJNb2Q4bk5HN1FaNXRYWnlXc0pldmZ2alg2NWxtdmxoT3F3UXdIQ0NnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk1LCJhZHZTZWNyZXRLZXkiOiIyRkVsY0RBSDZvem5sR3k3VVpmVVpJZFZPZVpMdlJ3NHFtUnNCRWRPTlVZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwMTQ4OTkwNDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTZFNTA2MTE0NkFGQjA5NkVGNjY5MjlDOTJGNTdGNjYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjg1NzE4Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAxNDg5OTA0N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyMkM5MTJEQTJENEMxMTNFOTlDNkI2NEUwNjQ2NzdGRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI2ODU3MTg0fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJuQmFUSnpxR1MyYW1fS0NWSm5QSllRIiwicGhvbmVJZCI6IjhlZmVlZGFhLWU2ZDctNGQ5Ni04ZTdhLTI3MzU5OTNkMmUzNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkUi92NjdaZ2U2b2JuLzJpU0FyNGZNTWVHUHM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGtQZTBreUF5TXpWNzREMWFmY3I1L3dram40PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkExTVJQVEsxIiwibWUiOnsiaWQiOiIyMzQ5MDE0ODk5MDQ3OjY0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkpvcHBhIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLYTEwMmtReXYrMnR3WVlCaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJTSWk0a0sycnZDVklWeU4rR0Vxb2Ywdlo4MS9NckZPS1kxMEJEd21POGdBPSIsImFjY291bnRTaWduYXR1cmUiOiJMRWI4eTZ5cGt6dEhpM1QwYWlGVDIrQTJVU2dSWDVEN3MxZEpSYkZ2OCtrbWpIQnpiMGMrc25RTTV1d2JxSCsyTWxFTTdYcXdsRDNtMkVnWWJ4K1dDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNzFiVm0wSjl1TUpGNUJtaFk5bzF0UmRYOURjelNPOTdTMXIwSGxlRGMxWkhtOXNPQm5iNXlqRXVYSHRTeG9INytFS3dFUXAzcDMxM0x1RkFlSTN0RGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDE0ODk5MDQ3OjY0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVpSXVKQ3RxN3dsU0ZjamZoaEtxSDlMMmZOZnpLeFRpbU5kQVE4Smp2SUEifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjY4NTcxNzYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT05EIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUpFWWV4T3VOUmNPQU13OFBEdU9MaEJrRmlKWTA4d0xDYTFLMlBwTExWbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicjZpTmRkL0drOUt2bGdxeVVMcjV5dHc1b0NJQjJ2dWE1NXZmeWUwVTcxMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3QnZrNkJvNFJGRnhmRWFpMlVpNnEyRWNPWWtyanNXa1dsckQzWDJ6V1drPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYV2NrNUhGdlNqTGpNU2M1SVQ4TUpMMk1zR3ZTeUE4U2s4TGgreEtrMHowPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9HRFRBNnd5bW5heFJ0d3hIS3lUNjFQN1R1cUtkdkYwYXcrMzAyMUkyV2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZNHJ2bzFnSU1KVUk4dnNxSHBZSi9YTG5iTHlBSVI4aElsMlVvbEM2bmM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0lyYTN2dC9laGlPZW1JVmtIcVRORTdwY0NOb3A3THJKbmtqMDVCTVczND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicnU2TVRmcENNZEcra2JGY2duR0NhZFg2bWcwbXdGUmZtQk9DaCtwazJnMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktISmNjaklsMEJwZ3hzdWhtQkRtZVNPUnFsaTdmcXU4ZjNiRWJVbFZVWUJwa0NScjdYR0R2VTI3THRTVUp3NjJ1S240UTVBemEwc09CUDZHajg1L2p3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDAsImFkdlNlY3JldEtleSI6Ik9nclh3YzJ1cEdmN2RTZkF6d0FDaUlxdHFzQVVPbFFZMzZDMndEYmxVRWc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkNTNXlkdDVUUzllR00zSzVfaV9HTEEiLCJwaG9uZUlkIjoiYWUyNGVkMTMtNzY2Yi00ZWEwLTkzZDMtYjM0MGQxYWMxYTY2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpmdnZ0ekc3QWJYMGdKVkg3dDZsdEdqbjNTYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaak41Y0lNd3ZHWVJCS0piNGxEOUJpVFFtYUE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTk5FWjFLUEEiLCJtZSI6eyJpZCI6IjI1NDc4OTk3MDQ0NzoxMEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGpGN0w0REVJTCt0N3NHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTCsyQUt1NE5kUVpVdllaVjdWM2M3VmV6OTB0NFNwQVRrbVRUeUdLK1RDdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMDdKQXZKK0hFMlpUbDVkdDkva2duUi8vYXIxWFByUFhkTU41MkVuVWRzL09HZnlNbUhpd29aOC9ONUl4TkdPMHdCVm82akxoaEFMRW9WdVBjTEVXRHc9PSIsImRldmljZVNpZ25hdHVyZSI6ImI3YlhQd3A1a1RtRlEveFV2SU83a1lXZTBDdHZCc1FiRFNPU1lPY2M3Y3lYMjVuT014QmF1dmFOemxucWh1Y01KRnVTN3BFeGFtVkpydXN3WGxQaWpBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzg5OTcwNDQ3OjEwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlMvdGdDcnVEWFVHVkwyR1ZlMWQzTzFYcy9kTGVFcVFFNUprMDhoaXZrd3MifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzUyNjE5NjgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTHY1In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Oliifrank",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 254789970447",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

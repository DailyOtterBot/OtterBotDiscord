"use strict";
// a file that's run each day that sends an image to each channel saved
// a slash command that lets server admins add channels to a database
// a file that checks when the bot joins a new guild and runs said command
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ref = exports.client = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const { token } = require('../config.json');
exports.client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
// FIREBASE:
// Import the functions you need from the SDKs you need
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const database_1 = require("firebase-admin/database");
// Fetch the service account key JSON file contents
var serviceAccount = require("../otterbot-70ee1-firebase-adminsdk-x9182-00a93434d6.json");
// Initialize the app with a service account, granting admin privileges
const app = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "https://otterbot-70ee1-default-rtdb.firebaseio.com/"
});
const database = (0, database_1.getDatabase)(app);
exports.ref = database.ref("restricted_access/secret_document");
// As an admin, the app has access to read and write all data, regardless of Security Rules
exports.ref.once("value", function (snapshot) {
    //   console.log(snapshot.val());
    console.log("Database loaded");
});
// Load the commands
const commandCheck = async () => {
    const basePath = (0, path_1.join)(__dirname, "commands");
    const commands = [];
    const commandFiles = (0, fs_1.readdirSync)(basePath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
    // Place your client and guild ids here
    const clientId = '994046329678463026';
    const guildId = '521856622998323202';
    for (const file of commandFiles) {
        const command = require((0, path_1.join)(basePath, file)).default;
        commands.push(command.data.toJSON());
    }
    const rest = new rest_1.REST({ version: '9' }).setToken(token);
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(v9_1.Routes.applicationCommands(clientId), 
            //Routes.applicationGuildCommands(clientId, guildId),
            { body: commands });
            console.log('Successfully reloaded application (/) commands.');
        }
        catch (error) {
            console.error(error);
        }
    })();
};
// Start the bot
const init = async () => {
    exports.client.commands = new discord_js_1.Collection();
    const commandsPath = (0, path_1.join)(__dirname, 'commands');
    const commandFiles = (0, fs_1.readdirSync)(commandsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
    for (const file of commandFiles) {
        const filePath = (0, path_1.join)(commandsPath, file);
        const command = require(filePath).default;
        exports.client.commands.set(command.data.name, command);
    }
    const eventsPath = (0, path_1.join)(__dirname, 'events');
    const eventFiles = (0, fs_1.readdirSync)(eventsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
    for (const file of eventFiles) {
        const filePath = (0, path_1.join)(eventsPath, file);
        const event = require(filePath).default;
        if (event.once) {
            exports.client.once(event.name, (...args) => event.execute(...args));
        }
        else {
            exports.client.on(event.name, (...args) => event.execute(...args));
        }
    }
    // client.on('interactionCreate', async interaction => {
    // });
    exports.client.login(token);
};
// Run the bot
const main = async () => {
    await init();
    await commandCheck();
};
main();
//# sourceMappingURL=index.js.map
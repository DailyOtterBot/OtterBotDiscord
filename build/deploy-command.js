"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const node_fs_1 = __importDefault(require("node:fs"));
const { token } = require('../config.json');
const commands = [];
const commandFiles = node_fs_1.default.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Place your client and guild ids here
const clientId = '994046329678463026';
const guildId = '521856622998323202';
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
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
//# sourceMappingURL=deploy-command.js.map
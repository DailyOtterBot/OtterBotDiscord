"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const ping = {
    data: new builders_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows bot latency.'),
    execute: async function (interaction) {
        await interaction.reply('Pong!');
    }
};
exports.default = ping;
//# sourceMappingURL=ping.js.map
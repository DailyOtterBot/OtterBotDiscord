"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const twitter = {
    data: new builders_1.SlashCommandBuilder()
        .setName('twitter')
        .setDescription('Links to the @OttersEveryDay Twitter account'),
    execute: async function (interaction) {
        const row = new discord_js_1.MessageActionRow()
            .addComponents(new discord_js_1.MessageButton()
            .setLabel('Twitter Account')
            .setStyle('LINK')
            .setURL('https://twitter.com/OttersEveryDay'));
        const messageId = await interaction.reply({ components: [row], ephemeral: true });
    }
};
exports.default = twitter;
//# sourceMappingURL=twitter.js.map
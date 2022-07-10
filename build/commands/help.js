"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const help = {
    data: new builders_1.SlashCommandBuilder()
        .setName('help')
        .setDescription('Sends a help message'),
    execute: async function (interaction) {
        const embed = new discord_js_1.MessageEmbed();
        embed.setTitle("Help")
            .setColor("#bfe2fe")
            .setThumbnail("https://pbs.twimg.com/profile_images/1483969427175784449/ngqr3WgK_400x400.jpg")
            .addFields({ name: "/otter", value: "Replies with a picture of an otter. \n eg: `/otter number 21`, `/otter today`, `/otter random`" }, { name: "/add", value: "Adds a channel to recieve daily otters. \n eg: `/add #channel`" }, { name: "/remove", value: "Removes a channel from recieving daily otters. \n eg: `/remove #channel`" }, { name: "/list", value: "Lists the channels in this server recieving daily otters. \n eg: `/list`" }, { name: "/twitter", value: "Links to the @OttersEveryDay Twitter \n eg: `/twitter`" }, { name: "/ping", value: "Shows bot ping. \n eg: `/ping`" }, { name: "", value: "" }, { name: '"Where are my daily otters!?"', value: "Make sure OtterBot has permissions to View, and Send Embeds to the given channel." });
        const row = new discord_js_2.MessageActionRow()
            .addComponents(
        // new MessageButton()
        // 	.setCustomId('overview')
        // 	.setLabel('Overview')
        // 	.setStyle('PRIMARY'),
        new discord_js_2.MessageButton()
            .setLabel('Support')
            .setStyle('LINK')
            .setURL('https://github.com/DailyOtterBot/OtterBotDiscord/issues'));
        const messageId = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
};
exports.default = help;
//# sourceMappingURL=help.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const otter = {
    data: new builders_1.SlashCommandBuilder()
        .setName('otter')
        .addStringOption(option => option.setName('category')
        .setDescription("Random Otter or Today's Otter")
        .setRequired(true)
        .addChoices({ name: "today", value: "today" }, { name: "number", value: "number" }, { name: "random", value: "random" }))
        .addNumberOption(option => option.setName('number')
        .setDescription("Which day do you want?")
        .setRequired(false)
        .setMinValue(0))
        .setDescription('Sends an otter image 🦦'),
    execute: async function (interaction) {
        const today = new Date();
        const days = Math.floor((Date.now() - new Date("1/20/2022").getTime()) / (1000 * 3600 * 24));
        const randomDay = Math.floor(Math.random() * days + 1);
        console.log(days + " days since start.");
        await interaction.deferReply();
        const day = interaction.options.getString("category");
        const number = interaction.options.getNumber("number");
        if (day == "number") {
            const embed = new discord_js_1.MessageEmbed();
            embed.setTitle("Otter " + number)
                .setColor("#bfe2fe")
                .setImage("https://raw.githubusercontent.com/KwiiHours/OtterBot/main/images/otter%20(" + number + ").jpg");
            const messageId = await interaction.editReply({ embeds: [embed] });
        }
        else if (day === "today") {
            const embed = new discord_js_1.MessageEmbed();
            embed.setTitle("Today's Otter - Otter " + days)
                .setColor("#bfe2fe")
                .setImage("https://raw.githubusercontent.com/KwiiHours/OtterBot/main/images/otter%20(" + days + ").jpg");
            const messageId = await interaction.editReply({ embeds: [embed] });
        }
        else {
            const embed = new discord_js_1.MessageEmbed();
            embed.setTitle("Random Otter - Otter " + randomDay)
                .setColor("#bfe2fe")
                .setImage("https://raw.githubusercontent.com/KwiiHours/OtterBot/main/images/otter%20(" + randomDay + ").jpg");
            const messageId = await interaction.editReply({ embeds: [embed] });
        }
    }
};
exports.default = otter;
//# sourceMappingURL=otter.js.map
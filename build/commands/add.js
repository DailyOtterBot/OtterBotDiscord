"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const getServerConfig_1 = __importDefault(require("../functions/getServerConfig"));
const __1 = require("..");
const configRef = __1.ref.child("config");
const add = {
    data: new builders_1.SlashCommandBuilder()
        .setName('add')
        .addChannelOption(option => option.setName('channel')
        .setRequired(true)
        .setDescription('The channel to add the reaction to'))
        .setDescription('Add channels to recieve daily otter pictures'),
    execute: async function (interaction) {
        const channelSnowflake = interaction.options.getChannel("channel", true);
        const channelId = channelSnowflake.id;
        const guildId = interaction.guildId;
        if (channelSnowflake.type == 'GUILD_TEXT') {
            const existingConfig = await (0, getServerConfig_1.default)(guildId);
            if (existingConfig === null) {
                configRef.child(guildId).set([channelId]);
            }
            else {
                if (existingConfig.includes(channelId)) {
                    await interaction.reply({ content: `<#${channelId}> already added.`, ephemeral: true });
                    return;
                }
                else {
                    existingConfig.push(channelId);
                    await configRef.child(guildId).set(existingConfig);
                }
            }
            await interaction.reply("<#" + channelId + "> added.");
        }
        else {
            await interaction.reply('Please specify a **valid text channel** to add');
        }
    }
};
exports.default = add;
//# sourceMappingURL=add.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const getServerConfig_1 = __importDefault(require("../functions/getServerConfig"));
const __1 = require("..");
const configRef = __1.ref.child("config");
const remove = {
    data: new builders_1.SlashCommandBuilder()
        .setName('remove')
        .addChannelOption(option => option.setName('channel')
        .setRequired(true)
        .setDescription('The channel to remove otters from'))
        .setDescription('Removes a channel from recieving daily otters'),
    execute: async function (interaction) {
        const channelSnowflake = interaction.options.getChannel("channel", true);
        const channelId = channelSnowflake.id;
        const guildId = interaction.guildId;
        if (channelSnowflake.type == 'GUILD_TEXT') {
            const existingConfig = await (0, getServerConfig_1.default)(guildId);
            if (existingConfig === null) {
                await interaction.reply('Error');
                return;
            }
            else {
                if (existingConfig.includes(channelId)) {
                    for (let i = 0; i < existingConfig.length; i++) {
                        if (existingConfig[i] === channelId) {
                            existingConfig.splice(i, 1);
                            await configRef.child(guildId).set(existingConfig);
                            await interaction.reply("<#" + channelId + "> removed.");
                            return;
                        }
                    }
                }
                else {
                    await interaction.reply('Channel not in the database.');
                }
            }
        }
        else {
            await interaction.reply('Please specify a **valid text channel** to add');
        }
    }
};
exports.default = remove;
//# sourceMappingURL=remove.js.map
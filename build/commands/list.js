"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const getServerConfig_1 = __importDefault(require("../functions/getServerConfig"));
const __1 = require("..");
const configRef = __1.ref.child("config");
const list = {
    data: new builders_1.SlashCommandBuilder()
        .setName('list')
        .setDescription('Lists channels set to recieve otter pictures.'),
    execute: async function (interaction) {
        const guildId = interaction.guildId;
        const thisServer = await (0, getServerConfig_1.default)(guildId);
        if (thisServer === null) {
            await interaction.reply('No channels set to recieve otter pictures. Type `/add #channel` to add one.');
        }
        else {
            const embedNew = new discord_js_1.MessageEmbed();
            embedNew.setTitle("Channels set to recieve otter pictures")
                .setColor("#bfe2fe")
                .setThumbnail("https://pbs.twimg.com/profile_images/1483969427175784449/ngqr3WgK_400x400.jpg");
            if (thisServer.length < 25) {
                for (let i = 0; i < thisServer.length; i++) {
                    embedNew.addFields({
                        name: "Channel #" + (i + 1),
                        value: "<#" + thisServer[i] + ">",
                    });
                }
                const messageId = await interaction.reply({ embeds: [embedNew] });
            }
            else {
                for (let i = 0; i < 23; i++) {
                    embedNew.addFields({
                        name: "Channel #" + (i + 1),
                        value: "<#" + thisServer[i] + ">",
                    });
                }
                embedNew.addFields({
                    name: "Too many channels to list past this point due to Discord API limitations",
                    value: "...",
                });
                const messageId = await interaction.reply({ embeds: [embedNew] });
            }
        }
    }
};
exports.default = list;
//# sourceMappingURL=list.js.map
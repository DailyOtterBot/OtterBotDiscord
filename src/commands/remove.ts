import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { getSystemErrorMap } from 'util';
import getServerConfig from '../functions/getServerConfig';
import Command from '../types/Command';
import { ref } from '..';

const configRef = ref.child("config");

const remove: Command = {
    data: new SlashCommandBuilder()
    .setName('remove')
    .addChannelOption(option =>
        option.setName('channel')
        .setRequired(true)
        .setDescription('The channel to remove otters from')
    )    
    .setDescription('Removes a channel from recieving daily otters'),
    execute: async function (interaction) {
        const channelSnowflake = interaction.options.getChannel("channel", true);
        const channelId = channelSnowflake.id;
        const guildId = interaction.guildId;

        if (channelSnowflake.type == 'GUILD_TEXT') {
            const existingConfig = await getServerConfig(guildId);  

            if (existingConfig === null) {
                await interaction.reply('Error');
                return;
            } else {
                if (existingConfig.includes(channelId)){
                    for (let i = 0; i < existingConfig.length; i++) {
                        if (existingConfig[i] === channelId){
                            existingConfig.splice(i, 1);
                            await configRef.child(guildId).set(existingConfig);
                            await interaction.reply("<#" + channelId + "> removed.");
                            return;
                        }
                    }
                } else {
                    await interaction.reply('Channel not in the database.');
                }

            }

        } else {
            await interaction.reply('Please specify a **valid text channel** to add');
        }

    }
}

export default remove;

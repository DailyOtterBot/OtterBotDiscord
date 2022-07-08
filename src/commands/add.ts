import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { getSystemErrorMap } from 'util';
import getServerConfig from '../functions/getServerConfig';
import Command from '../types/Command';
import { ref } from '..';

const configRef = ref.child("config");

const add: Command = {
  data: new SlashCommandBuilder()
  .setName('add')
      .addChannelOption(option =>
          option.setName('channel')
          .setRequired(true)
          .setDescription('The channel to add the reaction to')
      )    
  .setDescription('Add channels to recieve daily otter pictures'),    
  execute: async function (interaction) {

		const channelSnowflake = interaction.options.getChannel("channel", true);
    const channelId = channelSnowflake.id;
    const guildId = interaction.guildId;
        
        if (channelSnowflake.type == 'GUILD_TEXT') {
          const existingConfig = await getServerConfig(guildId);  

          if (existingConfig === null) {
            configRef.child(guildId).set([channelId]);
          } else {
            if (existingConfig.includes(channelId)) {
              await interaction.reply({ content: `<#${channelId}> already added.`, ephemeral: true });
              return;
            } else {
              existingConfig.push(channelId);
              await configRef.child(guildId).set(existingConfig);
            }  
          }  
        await interaction.reply("<#" + channelId + "> added.")
        
        } else{
            await interaction.reply('Please specify a **valid text channel** to add');
        }    

  }      
}  

export default add;


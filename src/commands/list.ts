import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { getSystemErrorMap } from 'util';
import getServerConfig from '../functions/getServerConfig';
import Command from '../types/Command';
import { ref } from '..';

const configRef = ref.child("config");

const list: Command = {
  data: new SlashCommandBuilder()
  .setName('list')   
  .setDescription('Lists channels set to recieve otter pictures.'),    
  execute: async function (interaction) {
    const guildId = interaction.guildId;
    const thisServer = await getServerConfig(guildId);

    if (thisServer === null) {
        await interaction.reply('No channels set to recieve otter pictures. Type `/add #channel` to add one.');
    } else {
        const embedNew = new MessageEmbed();
		embedNew.setTitle("Channels set to recieve otter pictures")
			.setColor("#bfe2fe")
            .setThumbnail("https://pbs.twimg.com/profile_images/1483969427175784449/ngqr3WgK_400x400.jpg")
        
        for (let i = 0; i < thisServer.length; i++) {
            embedNew.addFields({
                name: "Channel #" + i+1,
                value: "<#" + thisServer[i] + ">",
            });
        }
        const messageId = await interaction.reply({ embeds: [embedNew]});
    }


  }
}

export default list;
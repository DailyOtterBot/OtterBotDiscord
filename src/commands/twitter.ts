import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';
import Command from '../types/Command';
import { CommandInteraction } from 'discord.js';


const twitter: Command = {
    data: new SlashCommandBuilder()
		.setName('twitter')
		.setDescription('Links to the @OttersEveryDay Twitter account'),

    execute: async function (interaction: CommandInteraction<'cached' | 'raw'>): Promise<void> {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Twitter Account')
                .setStyle('LINK')
                .setURL('https://twitter.com/OttersEveryDay'),
        );
        
    const messageId = await interaction.reply({ components: [row], ephemeral: true });
    }

}

export default twitter;
import Command from '../types/Command';
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';


const ping: Command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Shows bot latency.'),
	
	execute: async function (interaction: CommandInteraction<'cached' | 'raw'>): Promise<void> {
		await interaction.reply('Pong!');
	}
}

export default ping;
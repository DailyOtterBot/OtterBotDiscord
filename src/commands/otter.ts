import { SlashCommandBuilder } from '@discordjs/builders';
import Command from '../types/Command';
import { CommandInteraction, MessageEmbed } from 'discord.js';

const otter: Command = {
    data: new SlashCommandBuilder()
	.setName('otter')
	.addNumberOption(option =>
		option.setName('number')
			.setDescription("The number of the Otter you would like (OPTIONAL)")
			.setRequired(false)
			.setMinValue(1)
		)	
	.setDescription('Sends an otter image 🦦'),
    execute: async function (interaction: CommandInteraction<'cached' | 'raw'>): Promise<void> {
		const today = new Date();

		const days = Math.floor((Date.now() - new Date("1/20/2022").getTime()) / (1000 * 3600 * 24));
		const randomDay = Math.floor(Math.random() * days + 1);

		console.log(days + " days since start.");
		await interaction.deferReply();
		const number = interaction.options.getNumber("number");
		
		if (number === null) {
			const embed = new MessageEmbed();
			embed.setAuthor({ name: "Random Otter - Otter " + randomDay, iconURL: "https://pbs.twimg.com/profile_images/1483969427175784449/ngqr3WgK_400x400.jpg"})
				.setColor("#bfe2fe")
				.setImage("https://raw.githubusercontent.com/KwiiHours/OtterBot/main/images/otter%20(" + randomDay + ").jpg");
			const messageId = await interaction.editReply({ embeds: [embed] });
		} else if (number <= days) {
			const embed = new MessageEmbed();
			embed.setAuthor({ name: "Otter " + number, iconURL: "https://pbs.twimg.com/profile_images/1483969427175784449/ngqr3WgK_400x400.jpg"})
				.setColor("#bfe2fe")
				.setImage("https://raw.githubusercontent.com/KwiiHours/OtterBot/main/images/otter%20(" + number + ").jpg");
			const messageId = await interaction.editReply({ embeds: [embed] });
		} else {
			const embed = new MessageEmbed();
			embed.setAuthor({ name: "Latest possible Otter, Otter " + days, iconURL: "https://pbs.twimg.com/profile_images/1483969427175784449/ngqr3WgK_400x400.jpg"})
				.setColor("#bfe2fe")
				.setImage("https://raw.githubusercontent.com/KwiiHours/OtterBot/main/images/otter%20(" + days + ").jpg");
			const messageId = await interaction.editReply({ embeds: [embed], content: "Otter " + number + " is not yet available. Today's otter is Otter " + days + "!" });
		}

    }
}

export default otter;

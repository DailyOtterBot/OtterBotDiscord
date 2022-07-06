const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('twitter')
		.setDescription('Links to the @OttersEveryDay Twitter account'),
	async execute(interaction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Twitter Account')
                .setStyle('LINK')
                .setURL('https://twitter.com/OttersEveryDay'),
        );
        
    const messageId = await interaction.reply({ components: [row], ephemeral: true });
	},
};

const { SlashCommandBuilder } = require('@discordjs/builders');
const { getSystemErrorMap } = require('util');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription('The channel to add the reaction to')
        )
		.setDescription('Add channels to recieve daily otter pictures'),
	async execute(interaction) {
		const channelSnowflake = interaction.options.getChannel('channel');
        const channelID = channelSnowflake.id;
        
        if (channelSnowflake.type == 'GUILD_TEXT') {
            await interaction.reply(channelSnowflake.name + " added.")
            
        } else{
            await interaction.reply('Please specify a **valid text channel** to add');
        }

	},
};

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Sends a help message'),
	async execute(interaction) {

        const embed = new MessageEmbed();
		embed.setTitle("Help")
			.setColor("#bfe2fe")
            .setThumbnail("https://pbs.twimg.com/profile_images/1483969427175784449/ngqr3WgK_400x400.jpg")
            .addFields(
                { name: "/otter", value: "Replies with a picture of an otter. \n eg: `/otter number 21`, `/otter today`, `/otter random`" },
                { name: "/add", value: "Adds a channel to recieve daily otters. \n eg: `/add #channel`" },
                { name: "/remove", value: "Removes a channel from recieving daily otters. \n eg: `/remove #channel`" },
                { name: "/list", value: "Lists the channels in this server recieving daily otters. \n eg: `/list`" },
                { name: "/twitter", value: "Links to the @OttersEveryDay Twitter \n eg: `/twitter`" },
                { name: "/ping", value: "Shows bot ping. \n eg: `/ping`" },
            )


        const row = new MessageActionRow()
			.addComponents(
				// new MessageButton()
				// 	.setCustomId('overview')
				// 	.setLabel('Overview')
				// 	.setStyle('PRIMARY'),
                // new MessageButton()
                //     .setCustomId('otter')
                //     .setLabel('Otter')
                //     .setStyle('SECONDARY'),
                // new MessageButton()
                //     .setCustomId('add')
                //     .setLabel('Add/Remove')
                //     .setStyle('SECONDARY'),
                // new MessageButton()
                //     .setCustomId('list')
                //     .setLabel('List')
                //     .setStyle('SECONDARY'),
                new MessageButton()
                    .setLabel('Support')
                    .setStyle('LINK')
                    .setURL('https://github.com/DailyOtterBot/OtterBotDiscord/issues'),
			);
			
		const messageId = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });

	},
};

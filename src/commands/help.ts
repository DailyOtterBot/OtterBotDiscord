import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { MessageActionRow, MessageButton } from 'discord.js';
import Command from '../types/Command';

const help: Command = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Sends a help message'),
    execute: async function (interaction) {
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
                { name: "", value: "" },
                { name: '"Where are my daily otters!?"', value: "Make sure OtterBot has permissions to View, and Send Embeds to the given channel." },
            )


        const row = new MessageActionRow()
			.addComponents(
				// new MessageButton()
				// 	.setCustomId('overview')
				// 	.setLabel('Overview')
				// 	.setStyle('PRIMARY'),
                new MessageButton()
                    .setLabel('Support')
                    .setStyle('LINK')
                    .setURL('https://github.com/DailyOtterBot/OtterBotDiscord/issues'),
			);
			
		const messageId = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });

    }
}

export default help;
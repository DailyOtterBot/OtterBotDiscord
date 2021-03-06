import { CommandInteraction, MessageEmbed, TextChannel } from 'discord.js';
import { getSystemErrorMap } from 'util';
import { ref } from '.';
import { client } from "./index.js";
import getServerConfig from './functions/getServerConfig';


const configRef = ref.child("config");
const guildID = '521856622998323202';
const servers = getServerConfig(guildID);

async function Run() {
    setTimeout(function(){
        console.log("Running");
        const today = new Date();
        const days = Math.floor((Date.now() - new Date("1/20/2022").getTime()) / (1000 * 3600 * 24));
        const randomDay = Math.floor(Math.random() * days + 1);

        console.log(days + " days since start.");

        const embed = new MessageEmbed();
                    embed.setAuthor({ name: "Today's Otter - Otter " + days, iconURL: "https://pbs.twimg.com/profile_images/1483969427175784449/ngqr3WgK_400x400.jpg"})
                        .setColor("#bfe2fe")
                        .setFooter({ 
                            text: '"/remove #thisChannel" to stop recieving otters.',
                        })
                        .setImage("https://raw.githubusercontent.com/KwiiHours/OtterBot/main/images/otter%20(" + days + ").jpg");


        const allGuilds = client.guilds.cache.map(guild => guild.id);

    configRef.orderByValue().on('value', (snapshot) => {
        snapshot.forEach((data) => {
            for (let i = 0; i < data.val().length; i++) {
                const guildId = data.key;
                const channelId = data.val()[i];

                //check if guild ID is in allGuilds
                if (allGuilds.includes(guildId!)) {
                    //check if channel ID is in guild
                    const guild = client.guilds.cache.get(guildId!);
                    if (guild) {
                        const channel = guild.channels.cache.get(channelId!);
                        if (channel && guild.me?.permissionsIn(channel).has("SEND_MESSAGES") && guild.me?.permissionsIn(channel).has("EMBED_LINKS") && guild.me?.permissionsIn(channel).has("VIEW_CHANNEL")) {
                            (channel as TextChannel).send({ embeds: [embed] });
                        }
                    }
                }
                console.log("Sent daily otter in " + guildId + " to " + channelId);
            }
        });
    });

}, 10000);
};

async function Run2() {
    setTimeout(function(){
        // exit process to restart the bot on heroku, stopping the process from being skipped by the scheduler
        process.exit(1);
    }, 30000);
};


Run();
Run2();
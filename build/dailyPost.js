"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const _1 = require(".");
const index_js_1 = require("./index.js");
const getServerConfig_1 = __importDefault(require("./functions/getServerConfig"));
const configRef = _1.ref.child("config");
const guildID = '521856622998323202';
const servers = (0, getServerConfig_1.default)(guildID);
async function Run() {
    setTimeout(function () {
        console.log("Running");
        const today = new Date();
        const days = Math.floor((Date.now() - new Date("1/20/2022").getTime()) / (1000 * 3600 * 24));
        const randomDay = Math.floor(Math.random() * days + 1);
        console.log(days + " days since start.");
        const embed = new discord_js_1.MessageEmbed();
        embed.setTitle("Today's Otter - Otter " + days)
            .setColor("#bfe2fe")
            .setFooter("`/remove #thisChannel` to stop recieving otters.")
            .setImage("https://raw.githubusercontent.com/KwiiHours/OtterBot/main/images/otter%20(" + days + ").jpg");
        const allGuilds = index_js_1.client.guilds.cache.map(guild => guild.id);
        // configRef.orderByChild("guildId").on("child_added", (snapshot) => {
        //     console.log(snapshot.val());
        // });
        // configRef.orderByChild("guildId").on("child_added", (snapshot) => {
        //     snapshot.forEach((data) => {
        //         console.log(data.val());
        //     });
        // });
        configRef.orderByValue().on('value', (snapshot) => {
            snapshot.forEach((data) => {
                for (let i = 0; i < data.val().length; i++) {
                    const guildId = data.key;
                    const channelId = data.val()[i];
                    //check if guild ID is in allGuilds
                    if (allGuilds.includes(guildId)) {
                        //check if channel ID is in guild
                        const guild = index_js_1.client.guilds.cache.get(guildId);
                        if (guild) {
                            const channel = guild.channels.cache.get(channelId);
                            if (channel && guild.me?.permissionsIn(channel).has("SEND_MESSAGES") && guild.me?.permissionsIn(channel).has("EMBED_LINKS") && guild.me?.permissionsIn(channel).has("VIEW_CHANNEL")) {
                                channel.send({ embeds: [embed] });
                            }
                        }
                    }
                    console.log("Sent daily otter in " + guildId + " to " + channelId);
                }
            });
        });
        // for (let i = 0; i < allGuilds.length; i++) {
        //     const guildId = allGuilds[i];
        //     const thisServer = await getServerConfig(guildId);
        //     console.log(guildID);
        //     // if (thisServer !== null) {
        //     //     // for (let j = 0; j < thisServer.length; j++) {
        //     //     //     // client.guilds.fetch(guildId).channels.get("812446252284772365").send(message.content)
        //     //     // }
        //     //     console.log(guildID);
        //     // }
        // }
    }, 10000);
}
;
Run();
//# sourceMappingURL=dailyPost.js.map
// a file that's run each day that sends an image to each channel saved
// a slash command that lets server admins add channels to a database
// a file that checks when the bot joins a new guild and runs said command


const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes, ActivityType } = require('discord-api-types/v9');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
module.exports.client = client;

// Load the commands
const commandCheck = async () => {
    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    // Place your client and guild ids here
    const clientId = '994046329678463026';
    const guildId = '521856622998323202';

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(token);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(clientId),
                //Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}

// Start the bot
const init = async () => {


    client.commands = new Collection();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        client.commands.set(command.data.name, command);
    }

    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }

    // client.on('interactionCreate', async interaction => {
        
    // });
    client.login(token);
}

// Run the bot
const main = async () => {
    await init();
    await commandCheck();
}

main();
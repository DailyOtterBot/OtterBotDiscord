const index = require("../index.js");
const client = index.client;

module.exports = {
    name: 'interactionCreate',
    execute(interaction){
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
             command.execute(interaction);
        } catch (error) {
            console.error(error);
             interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}
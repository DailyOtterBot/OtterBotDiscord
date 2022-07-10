"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const interactionCreate = {
    name: 'interactionCreate',
    execute: function (interaction) {
        if (!interaction.isCommand() || !interaction.inGuild())
            return;
        const command = __1.client.commands.get(interaction.commandName);
        if (!command)
            return;
        try {
            command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
};
exports.default = interactionCreate;
//# sourceMappingURL=interactionCreate.js.map
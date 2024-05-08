const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const config = require('../../config')

const clientId = config.bot.clientId;
const guildId = config.bot.guildId;

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                try {
                    const command = require(`../commands/${folder}/${file}`);
                    client.commands.set(command.data.name, command);
                    client.commandArray.push(command.data.toJSON());
                } catch (error) {
                    console.error(`Error loading command from file ${file}:`, error);
                }
            }
        }

        const rest = new REST({
            version: '9'
        }).setToken(config.bot.token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};

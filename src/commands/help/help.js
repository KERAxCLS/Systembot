const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('sendet ein Hilf embed')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const helpEmbed = new EmbedBuilder()
            .setTitle('Du brauchst hilfe ?')
            .setDescription('In der Config datei vom Bot findest du alles was du brauchst \n config.js')
            .addFields({ name: 'Support Discord Names', value: '.keraa. / gerodiegarro'})

        await interaction.reply({ embeds: [helpEmbed], ephemeral: true})
    }
}
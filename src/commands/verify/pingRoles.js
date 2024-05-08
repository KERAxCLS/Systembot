const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping-setup')
        .setDescription('setzt das ping system auf')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
       
        const pingEmbed = new EmbedBuilder()
            .setTitle('Ping Roles')
            .setDescription('Wähle deine Ping Rollen aus um bei wichtigen Events Informiert zu werden')
            .setColor("Blue")
            .setImage('');

        const infoButton = new ButtonBuilder()
            .setLabel('Info')
            .setCustomId('info')
            .setStyle(1)
            .setEmoji('ℹ️')


        const giveawayButton = new ButtonBuilder()
            .setLabel('Giveaway')
            .setCustomId('giveaway')
            .setStyle(1)
            .setEmoji('🎁')

        const streamButton = new ButtonBuilder()
            .setLabel('Stream')
            .setCustomId('stream')
            .setStyle(1)
            .setEmoji('🎥')

        const row = new ActionRowBuilder()
			.addComponents(infoButton, giveawayButton, streamButton);

        await interaction.reply({ embeds: [pingEmbed], components: [row]})

    }
}
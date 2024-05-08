const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const memberStates = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription('Sendet das Verify System'),

    async execute(interaction) {
        if (!interaction.inGuild()) {
            return interaction.reply('Dieser Befehl kann nur in einem Server verwendet werden.');
        }

        const memberId = interaction.user.id;
        const isVerified = memberStates.get(memberId) || false;

        const verifyEmbed = new EmbedBuilder()
            .setTitle('Verify')
            .setDescription(`Drücke auf den Button um dich ${isVerified ? 'zu entverifizieren' : 'zu verifizieren'}`)
            .setColor("Blue")
            .addFields({ name: 'Whitelist', value: 'Sobald du dich Verifiziert hast, bekommst du Automatisch die Whitelist und kannst auf unserem Server spielen'})
            .setTimestamp()
            .setImage('');


        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('verify_button')
                    .setLabel('Verify')
                    .setStyle('Secondary')  
            );

        await interaction.reply({ embeds: [verifyEmbed], components: [row] });
    },
};

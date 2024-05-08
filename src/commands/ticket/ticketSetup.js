const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ticket-setup')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription('setzt das TicketSystem auf'),

    async execute(interaction) {

        const ticketEmbed = new EmbedBuilder()   

            .setAuthor
                    ({ 
                        name: '', 
                        iconURL: ''
                    })
            .setTitle('Ticket System')
            .setDescription('wähle eine Kategorie aus, die du wählen möchtest um ein ticket zu öffnen')
            .setColor('Blue')
            .setImage('')


        const menu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('ticketsetup')
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setPlaceholder('Wähle eine Kategorie aus')
                    .addOptions(
                        {
                            label: 'Fraktions - Anliegen',
                            value: 'fraktion',
                            description: 'Du hast möchtest eine Fraktion öffnen oder hast ein ein Anliegen.',
                        },
                        {
                            label: 'Support',
                            description: 'für allgemeine fragen und hilfe',
                            value: 'support',
                        },
                        {
                            label: 'Spende',
                            description: 'kaufe etwas für den Server',
                            value: 'spende'
                        },
                        {
                            label: 'Team',
                            description: 'Bewerbe dich bei uns im Team',
                            value: 'team'
                        }
                    )
            )


        await interaction.reply({ embeds: [ticketEmbed], components: [menu] })
    }
}
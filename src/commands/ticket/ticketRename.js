const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket-rename')
    .setDescription('Ändert den Namen des Tickets')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('new_name')  // Corrected the option name to 'new_name'
        .setDescription('Der neue Name für das Ticket')
        .setRequired(true)
    ),

  async execute(interaction) {
    const newName = interaction.options.getString('new_name');  // Corrected the option name to 'new_name'

    if (!newName) {
      return interaction.reply('Die Umbenennung wurde abgebrochen oder die Eingabe war ungültig.');
    }
    await interaction.channel.setName(newName);

    interaction.reply({content: `Der Kanal wurde erfolgreich in "${newName}" umbenannt.`, ephemeral: true});
  },
};

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket-adduser')
    .setDescription('Fügt einen Benutzer zum Ticket hinzu')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('Der Benutzer, der zum Ticket hinzugefügt werden soll')
        .setRequired(true)
    ),

  async execute(interaction) {
    const addedUser = interaction.options.getUser('user');

    if (!addedUser) {
      return interaction.reply('Die Benutzerhinzufügung wurde abgebrochen oder die Eingabe war ungültig.');
    }

    const channel = interaction.channel;
    await channel.permissionOverwrites.create(addedUser, {
        ViewChannel : true,
    });

    interaction.reply({content: `Der Benutzer ${addedUser.tag} wurde erfolgreich zum Ticket hinzugefügt.`, ephemeral: true});
  },
};

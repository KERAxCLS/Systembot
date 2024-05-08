const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, ActionRowBuilder, Collection, ButtonBuilder, ButtonStyle} = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const config = require('../config')
const Discord = require('discord.js');
client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(config.bot.token);

})();

client.once('ready', () => {
  console.log(`Made by Gero & Kera System Bot`)
})

let i = 0
let j = config.bot.activitys.length - 1

setInterval(() => {
  const activity = config.bot.activitys[i]
  client.user.setPresence({
    activities: [{
      name: activity.name,
      type: Discord.ActivityType[activity.type]
    }],
    status: activity.status
  });
  i++
  if (i > j) i = 0
}, config.bot.intervall);




client.on('guildMemberAdd', async (member) => {
  const welcomeChannelId = config.bot.WelcomeChannel[0].channelId;
  const WelcomeChannel = config.bot.WelcomeChannel[0]

  const welcomeEmbed = new EmbedBuilder()
    .setColor(config.bot.WelcomeChannel[0].color)
    .setTitle(config.bot.WelcomeChannel[0].title)
    .setDescription(`Willkommen auf dem Server, <@${member.id}>`)
    .setImage(config.bot.WelcomeChannel[0].image)
  for (const field of WelcomeChannel.fields) {
    welcomeEmbed.addFields({ name: field.name, value: field.value });
  }

  const channel = member.guild.channels.cache.get(welcomeChannelId);

  if (channel) {
    channel.send({ embeds: [welcomeEmbed] });
  } else {
    console.error('Der Willkommenskanal wurde nicht gefunden.');
  }

});



//ticketsystem//

client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    const { customId } = interaction;
    if (customId === 'delete') {
     
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
        return interaction.reply({ content: 'Du hast keine Berechtigung, diesen Kanal zu löschen.', ephemeral: true });
      }

      try {
        await interaction.channel.delete();
        interaction.reply({ content: 'Der Kanal wurde erfolgreich gelöscht.', ephemeral: true });
      } catch (error) {
        console.error('Fehler beim Löschen des Kanals:', error);
        interaction.reply({ content: 'Ein Fehler ist beim Löschen des Kanals aufgetreten.', ephemeral: true });
      }
    }
  }

  if (!interaction.isStringSelectMenu()) return;

  const selectedValue = interaction.values[0];

  // Hier IDs der Kategorien einfügen
  const categoryIds = {
    'fraktion': config.bot.TicketSystem[0].fraktion,
    'support': config.bot.TicketSystem[0].support,
    'spende': config.bot.TicketSystem[0].spende,
    'team': config.bot.TicketSystem[0].team,
  };

  const categoryId = categoryIds[selectedValue];
  const category = interaction.guild.channels.cache.get(categoryId);

  if (category) {
    const teamRole = config.bot.teamRoleId;
    const channelName = `${selectedValue.toLowerCase()} ${interaction.user.username}`;

    const channel = await interaction.guild.channels.create({
      name: channelName,
      type: 0,
      parent: category.id,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: teamRole,
          allow: [PermissionsBitField.Flags.ViewChannel]
        }
      ],
      topic: `Ticket-Kanal für ${selectedValue}`
    });

    const deleteButton = new ButtonBuilder()
      .setCustomId('delete')
      .setLabel('Delete')
      .setEmoji('🔒')
      .setStyle(ButtonStyle.Danger)

    const embeds = new EmbedBuilder()
      .setTitle('Ticket erstellt!')
      .setDescription(`Schildere bitte direkt dein Anliegen, damit wir dir direkt helfen können.`)
      .setColor("Blue")
      .addFields({ name: 'Infos', value: `Ticket erstellt von <@${interaction.user.id}>` })
      .setImage('');

    const row = new ActionRowBuilder()
      .addComponents(deleteButton);

    channel.send({ content: `<@&${teamRole}> Neues ${selectedValue} Ticket erstellt!`, embeds: [embeds], components: [row] });

    const ticketChannelLink = `<#${channel.id}>`;
    const userMessage = `Dein ${selectedValue} Ticket wurde erstellt! Klicke hier, um zum Ticket-Kanal zu gelangen: ${ticketChannelLink}`;
    await interaction.reply({ content: `${userMessage}`, ephemeral: true });
  }
});

const memberStates = new Map();

// Konstanten für Rollen-IDs
const verifyRoleId = config.bot.GiveRole[0].verifyRoleId
const infoRoleId = config.bot.GiveRole[0].infoRoleId
const giveawayRoleId = config.bot.GiveRole[0].giveawayRoleId
const streamRoleId = config.bot.GiveRole[0].streamRoleId

// Gemeinsame Funktion für Rollenverwaltung
async function handleRoleInteraction(interaction, roleId, successMessage) {
  await interaction.reply({ content: successMessage, ephemeral: true });

  const memberId = interaction.user.id;
  const member = interaction.guild.members.cache.get(memberId);

  if (!member) return;

  const isVerified = memberStates.get(memberId) || false;

  memberStates.set(memberId, !isVerified);

  const role = interaction.guild.roles.cache.get(roleId);

  if (!role) return;

  if (isVerified) {
    await member.roles.remove(role);
  } else {
    await member.roles.add(role);
  }
}

// Interaktion für die Whitelist-Rolle
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'verify_button') {
    await handleRoleInteraction(interaction, verifyRoleId, 'Du hast Erfolgreich die Whitelist erhalten');
  }
});

// Interaktion für die Info-Rolle
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'info') {
    await handleRoleInteraction(interaction, infoRoleId, 'Du hast Erfolgreich die Ping Rolle erhalten');
  }
});

// Interaktion für die Giveaway-Rolle
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'giveaway') {
    await handleRoleInteraction(interaction, giveawayRoleId, 'Du hast Erfolgreich die Giveaway Rolle erhalten');
  }
});

// Interaktion für die Stream-Rolle
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'stream') {
    await handleRoleInteraction(interaction, streamRoleId, 'Du hast Erfolgreich die Stream Rolle erhalten');
  }
});
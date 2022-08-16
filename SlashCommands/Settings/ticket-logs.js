const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const db = require(`quick.db`)

module.exports = {
    name: "ticket-logs",
    description: "Setup the ticket-logs channel",
    premium: true,
    options: [
    {
        name: "system",
        description: "Select which Ticket-System you want to setup",
        type: "STRING",
        required: true,
        choices: [
          { name: `Reaction Roles`, value: `2` },
          { name: `Ticket-System`, value: `1` },
        ]
      },
      {
          name: "channel",
          description: "ticket-logs channel",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true,
      }
    ], 
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      let s = interaction.options.getString('system');
      let channel = interaction.options.getChannel("channel");
const role = db.get(`adminrole_${interaction.guild.id}${s}`);

      if(!role) return interaction.followUp(`${client.emoji.wrong} **Ticket system not setup yet! Set it first**`)
      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: `${client.emoji.wrong} **You cannot use this Command to Manage the Ticket-System!**`, ephemeral: true})


      const panel = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`📨 Ticket-Logs set for The \` ${s}. Ticket-System \``)
      .setDescription(`This channel is now set as the **Ticket-Logs** channel! New ticket closes will be posted here!`)
      .setFooter(`Ticketing powered by Azury.live`, interaction.guild.iconURL())

     
      
      interaction.followUp({ content: `${client.emoji.correct} Set **${channel.name} (${channel.id}) as the Ticket-Log channel!**` })

      db.set(`ticketlogs_${interaction.guild.id}`, channel)
      client.channels.cache.get(channel.id).send({ embeds: [panel] })
    },
};
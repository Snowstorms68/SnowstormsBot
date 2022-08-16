const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "vote",
    description: "Vote for the bot <3",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);

      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`💖 Vote for ${client.user.username}`)
      .setDescription(`<a:bluebouncearrow:948357312500867082> **[Vote on https://bobeebeatz.ml/](https://bobeebeatz.ml/discord/)**`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic : true }))
      .setFooter(`Made with 💖 by bobeebeatz.ml/discord`) 

      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setURL(`https://bobeebeatz.ml/discord`)
				.setLabel('Vote on https://bobeebeatz.ml/')
				.setStyle('LINK'),
			);
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb], components: [row] });
      }, 500);
    },
};

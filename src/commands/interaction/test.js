const { SlashCommandBuilder } = require('discord.js')

module.exports = { // Borrar
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Para testear esta mierda'),
  async run (client, interaction) {
    await interaction.reply('Sí funciono ❤️')
  }
}

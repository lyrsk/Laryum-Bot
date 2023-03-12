const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Para testear esta mierda'),
  async execute(interaction) {
    await interaction.reply('Sí funciono <3')
  }
}

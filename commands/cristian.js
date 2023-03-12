const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cris')
    .setDescription('Mensaje para el puto'),
  async execute(interaction) {
    await interaction.reply('Puto .l.')
  }
}

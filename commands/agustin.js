const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('agus')
    .setDescription('Mensaje para el marica'),
  async execute(interaction) {
    await interaction.reply('Deja de joder, Agustin. Anda a pajearte.')
  }
}

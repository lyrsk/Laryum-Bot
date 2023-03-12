const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fer')
    .setDescription('Mensaje para el trolo'),
  async execute(interaction) {
    await interaction.reply('NO JODAS, FERNANDO')
  }
}

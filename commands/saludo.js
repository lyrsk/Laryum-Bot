const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hola')
    .setDescription('Saluda al bot'),
  async execute (interaction) {
    await interaction.reply('¡Hola, soy Laryum! ✨')
  }
}

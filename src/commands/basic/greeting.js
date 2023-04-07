const { SlashCommandBuilder } = require('discord.js')

module.exports = { // Borrar
  data: new SlashCommandBuilder()
    .setName('hola')
    .setDescription('Saluda al bot'),
  async run (client, interaction) {
    await interaction.reply('¡Hola, soy Laryum! ✨')
  }
}

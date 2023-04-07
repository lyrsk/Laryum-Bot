const { SlashCommandBuilder } = require('discord.js')

module.exports = { // Borrar
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async run (client, interaction) {
    await interaction.reply('Pong! 🏓')
  }
}

const { SlashCommandBuilder } = require('discord.js')

module.exports = { // Borrar
  data: new SlashCommandBuilder()
    .setName('react')
    .setDescription('Reacciona a un mensaje'),
  async run (client, interaction) {
    if (!interaction.isChatInputCommand()) return

    const { commandName } = interaction

    if (commandName === 'react') {
      const message = await interaction.reply({ content: 'Esto funciona de forma sospechosa.', fetchReply: true })
      message.react('🧐')
    }
  }
}

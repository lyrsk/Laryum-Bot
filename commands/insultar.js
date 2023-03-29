const { SlashCommandBuilder } = require('discord.js')

module.exports = { // Mejorar
  data: new SlashCommandBuilder()
    .setName('spam')
    .setDescription('Envía un mensaje spam al usuario seleccionado')
    .addUserOption(option => option.setName('target').setDescription('El usuario al que quieres enviar el spam').setRequired(true))
    .addStringOption(option => option.setName('mensaje').setDescription('El mensaje que se enviará en spam').setRequired(true)),

  async execute (interaction) {
    const target = interaction.options.getUser('target')
    const message = (interaction.options.getString('mensaje') + ' \n').repeat(5)

    for (let i = 0; i < 3; i++) { // Con más de 3 mensajes, Discord bloquea el spam
      await new Promise(resolve => setTimeout(resolve, 500))
      await interaction.channel.send(`<@${target.id}> ${message}`)
    }

    await interaction.reply(`¡Spam enviado a ${target.username}!`)
  }
}

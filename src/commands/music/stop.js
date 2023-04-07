const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('¡Finalizar música!'),

  run: async (client, interaction) => {
    await interaction.deferReply().catch(err => {
      console.log(err)
    })

    const queue = client.distube.getQueue(interaction)

    if (!queue) return interaction.followUp('❌ Aún no hay ninguna canción en la lista ❌')

    client.distube.voices.leave(interaction)

    const message = await interaction.followUp('Stop')
    await message.react('⏹️')
  }
}

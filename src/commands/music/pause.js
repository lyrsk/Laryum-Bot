const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('¡Pausar música!'),

  run: async (client, interaction) => {
    await interaction.deferReply().catch(err => {
      console.log(err)
    })

    const queue = client.distube.getQueue(interaction)

    if (!queue) return interaction.followUp('❌ Aún no hay ninguna canción en la lista ❌')
    if (queue.paused === true) return interaction.followUp('⚠️ La canción ya está pausada ⚠️')
    interaction.followUp({ content: 'Música pausada ✅' })

    client.distube.pause(interaction)
  }
}

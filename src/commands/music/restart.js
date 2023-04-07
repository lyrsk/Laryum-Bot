const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('¡Restaurar canción!'),

  run: async (client, interaction) => {
    await interaction.deferReply().catch(err => {
      console.log(err)
    })

    const queue = client.distube.getQueue(interaction)

    if (queue.paused === false) return interaction.followUp('⚠️ La canción ya está sonando ⚠️')
    if (!queue) return interaction.followUp('❌ Aún no hay ninguna canción en la lista ❌')
    interaction.followUp({ content: 'Canción restaurada ✅' })

    queue.restart()
  }
}

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('¡Saltar canción!'),
  run: async (client, interaction) => {
    await interaction.deferReply().catch(err => {
      console.log(err)
    })

    const queue = client.distube.getQueue(interaction)

    if (!queue) return interaction.followUp('❌ Aún no hay ninguna canción en la lista ❌')
    if (queue.songs.length === 1) return interaction.followUp('No song found in the queue!')
    client.distube.skip(interaction)
    return interaction.followUp('⏩')
  }
}

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('¡Reanudar canción!'),

  run: async (client, interaction) => {
    await interaction.deferReply().catch(err => {
      console.log(err)
    })

    const queue = client.distube.getQueue(interaction)

    if (queue.paused === false) return interaction.followUp('⚠️ La canción ya está sonando ⚠️')
    if (!queue) return interaction.followUp('❌ Aún no hay ninguna canción en la lista ❌')

    const message = await interaction.followUp('Restart')
    await message.react('⏯️')

    queue.resume()
  }
}

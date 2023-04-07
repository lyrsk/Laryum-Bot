const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('¡Reproducir música!')
    .addStringOption(option => option.setName('name').setDescription('Nombre de la canción').setRequired(true)),

  run: async (client, interaction) => {
    await interaction.deferReply().catch(err => {
      console.log(err)
    })

    const string = interaction.options.getString('name')
    const voiceChannel = interaction.member.voice.channel

    client.distube.voices.join(voiceChannel)

    await client.distube.play(interaction.member.voice.channel, string)

    const tracks = await client.player.search(string, { requestedBy: interaction.user }).then(x => x.tracks[0])

    if (!tracks) return interaction.followUp('Música iniciada 🎵')
    const embed = new Discord.EmbedBuilder()
      .addFields({ name: 'Title', value: `${tracks.title}`, inline: true })
      .addFields({ name: 'Author', value: `${tracks.author}`, inline: true })
      .addFields({ name: 'Time', value: `${tracks.duration}`, inline: true })
      .addFields({ name: 'Views', value: `${tracks.views}`, inline: true })
      .addFields({ name: 'Thumbnail', value: '[Click](' + tracks.thumbnail + ')', inline: true })
      .addFields({ name: 'Video', value: '[Click](' + tracks.url + ')', inline: true })
      .setColor('Random')
      .setImage(`${tracks.thumbnail || 'https://cdn.discordapp.com/attachments/997487955860009038/1009062859889705062/Baslksz-1.png'}`)
      .setFooter({ text: 'Laryum ✨' })

    await interaction.followUp({ embeds: [embed] })
  }
}

const { InteractionType } = require('discord.js')
const { readdirSync } = require('fs')

module.exports = {
  name: 'interactionCreate',
  execute: async (interaction) => {
    const client = interaction.client
    if (interaction.type === InteractionType.ApplicationCommand) {
      if (interaction.user.bot) return

      async function routes (folder) {
        readdirSync(`./src/commands/${folder}`).forEach(file => {
          const command = require(`../../src/commands/${folder}/${file}`)
          if (interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
            command.run(client, interaction)
          }
        })
      }
      routes('basic')
      routes('interaction')
      routes('music')
    }
  }
}

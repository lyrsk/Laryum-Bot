const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { startBot } = require('./src/chatBot/bot.js')
const { loadEvents, loadCommands } = require('./src/events/load.js')
require('dotenv').config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.commands = new Collection()

const main = async (client) => {
  loadEvents(client)
  loadCommands(client, 'basic')
  loadCommands(client, 'interaction')
  startBot(client)
}

main(client)

client.login(process.env.TOKEN)

const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { Player } = require('discord-player')
const { startBot } = require('./src/chatBot/bot.js')
const { loadEvents, loadCommands } = require('./src/events/load.js')
require('dotenv').config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
})

const player = new Player(client)

client.player = player

client.distube = new DisTube(client, {
  leaveOnStop: false,
  leaveOnFinish: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({ emitEventsAfterFetching: true }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})

client.commands = new Collection()

const main = async (client) => {
  loadEvents(client)
  loadCommands(client, 'basic')
  loadCommands(client, 'interaction')
  loadCommands(client, 'music')
  startBot(client)
}

main(client)

client.login(process.env.TOKEN)

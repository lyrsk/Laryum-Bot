const fs = require('fs')
const path = require('path')
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const dotenv = require('dotenv'); dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// Carga los eventos
function loadEvents (client) {
  const eventsPath = path.join(__dirname, 'events')
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args))
    } else {
      client.on(event.name, (...args) => event.execute(...args))
    }
  }

  return client
}

// Carga los comandos
client.commands = new Collection()

function loadCommands (client, folder) {
  const commandsPath = path.join(__dirname, 'commands', folder)
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command)
    } else {
      console.log(`[ADVERTENCIA] Al comando en ${filePath} le falta una propiedad requerida de "datos" o "ejecutar".`)
    }
  }
}

const main = async (client) => {
  loadEvents(client)
  loadCommands(client, 'basic')
  loadCommands(client, 'interaction')
}

main(client)

client.login(process.env.TOKEN)

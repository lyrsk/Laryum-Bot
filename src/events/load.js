const fs = require('fs')
const path = require('path')

function loadEvents (client) { // Carga los eventos
  const eventsPath = __dirname
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

function loadCommands (client, folder) { // Carga los comandos
  const commandsPath = path.join(__dirname, '..', 'commands', folder)
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

module.exports = {
  loadEvents,
  loadCommands
}

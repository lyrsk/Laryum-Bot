const { Events } = require('discord.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute (client) {
    console.log(`¡Listo! Conectado como ${client.user.tag}`)
    client.user.setActivity('✨')
  }
}

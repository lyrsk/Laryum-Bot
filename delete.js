const { REST, Routes } = require('discord.js')
const dotenv = require('dotenv'); dotenv.config()

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

// Elimina comandos en un servidor específico según su ID
rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, 'commandId'))
  .then(() => console.log('Comando de servidor eliminado con éxito'))
  .catch(console.error)

// Elimina comandos globales según su ID
// rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, 'commandId'))
//   .then(() => console.log('Comando global eliminado con éxito'))
//   .catch(console.error)

// Elimina todos los comandos de un servidor específico
// rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [] })
//   .then(() => console.log('Eliminados con éxito todos los comandos del servidor'))
//   .catch(console.error)

// Elimina todos los comandos globales
// rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
//   .then(() => console.log('Eliminados con éxito todos los comandos globales'))
//   .catch(console.error)

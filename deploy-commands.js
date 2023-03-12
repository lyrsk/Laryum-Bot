const fs = require('node:fs')
const path = require('node:path')
const { REST, Routes } = require('discord.js')
const dotenv = require('dotenv'); dotenv.config()

const commands = []
// Toma todos los archivos de comandos que se crearon
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
}

// Construye y prepara una instancia del módulo REST
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Despliega los comandos
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`)

    // Actualiza los comandos globalmente
    // const data = await rest.put(
    //   Routes.applicationCommands(process.env.CLIENT_ID),
    //   { body: commands }
    // )

    // Actualiza los comandos en un servidor específico
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    )

    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    console.error(error)
  }
})()

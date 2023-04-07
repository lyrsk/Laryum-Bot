const fs = require('node:fs')
const path = require('node:path')
const { REST, Routes } = require('discord.js')
require('dotenv').config()

const loadCommands = (folder) => { // Carga los comandos
  const commands = []
  const commandsPath = path.join(__dirname, '..', 'commands', folder)
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
  console.log(commandsPath)
  for (const file of commandFiles) {
    const command = require(`${commandsPath}/${file}`)
    commands.push(command.data.toJSON())
  }
  return commands
}

const deployCommands = async (commands) => { // Despliega los comandos
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

  try {
    console.log(`Comenzando actualización de ${commands.length} comandos de la aplicación...`)

    // const data = await rest.put( // Actualiza los comandos globalmente
    //   Routes.applicationCommands(process.env.CLIENT_ID),
    //   { body: commands }
    // )

    const data = await rest.put( // Actualiza los comandos en un servidor específico
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    )
    console.log(`Se actualizaron con éxito ${data.length} comandos de la aplicación.`)
  } catch (error) {
    console.error(error)
  }
}

const main = async () => {
  const commandsBasic = loadCommands('basic')
  const commandsInteraction = loadCommands('interaction')
  const commandsMusic = loadCommands('music')
  const commands = [...commandsBasic, ...commandsInteraction, ...commandsMusic]
  await deployCommands(commands)
}

main()

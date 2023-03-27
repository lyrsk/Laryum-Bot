const fs = require('node:fs')
const path = require('node:path')
const { REST, Routes } = require('discord.js')
const dotenv = require('dotenv'); dotenv.config()

const loadCommands = () => { // Carga los comandos
  const commands = []
  const commandsPath = path.join(__dirname, 'commands')
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
  }
  return commands
}

const deployCommands = async (commands) => { // Despliega los comandos
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`)

    // const data = await rest.put( // Actualiza los comandos globalmente
    //   Routes.applicationCommands(process.env.CLIENT_ID),
    //   { body: commands }
    // )

    const data = await rest.put( // Actualiza los comandos en un servidor específico
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    )
    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    console.error(error)
  }
}

const main = async () => {
  const commands = loadCommands()
  await deployCommands(commands)
}

main()

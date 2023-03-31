const { OpenAIApi, Configuration } = require('openai')
const { Events } = require('discord.js')

function startBot (client) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_KEY
  })
  const openai = new OpenAIApi(config)
  const BOT_CHANNEL = '1082512312713359363'
  const PAST_MESSAGES = 10 // El bot lee los últimos 5 mensajes de la conversación

  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return
    if (message.channel.id !== BOT_CHANNEL) return

    message.channel.sendTyping()

    let messages = Array.from(await message.channel.messages.fetch({
      limit: PAST_MESSAGES,
      before: message.id
    }))
    messages = messages.map(m => m[1])
    messages.unshift(message)

    const users = [...new Set([...messages.map(m => m.member?.displayName || 'unknown'), client.user.username])]

    const lastUser = users.pop()

    let prompt = `The following is a conversation between ${users.join(', ')}, and ${lastUser}. \n\n`

    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i]
      const authorName = m.member?.displayName || 'unknown'
      prompt += `${authorName}: ${m.content}\n`
    }
    prompt += `${client.user.username}:`
    console.log('prompt:', prompt)

    const response = await openai.createCompletion({
      prompt,
      model: 'text-davinci-003',
      max_tokens: 500,
      stop: ['\n']
    })

    console.log('response', response.data.choices[0].text)
    await message.channel.send(response.data.choices[0].text)
  })
}

module.exports = { startBot }

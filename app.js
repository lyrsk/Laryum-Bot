import {Client, Events, GatewayIntentBits} from 'discord.js';
import dotenv from 'dotenv'; dotenv.config();

const client = new Client({intents:[GatewayIntentBits.Guilds]});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.login(process.env.TOKEN);


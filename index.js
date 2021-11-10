//DO NOT edit and run this file. This was used to initialise some packages. 
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env['token'];
const GUILD_ID = process.env['guild_id'];
const CLIENT_ID = process.env['client_id'];
const { Client, Intents } = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS]});

const commands = [{
  name: 'ping',
  description: 'Replies with Pong!'
}]; 

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong")
  }
});



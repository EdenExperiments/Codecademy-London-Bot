//DO NOT edit and run this file. This was used to initialise some packages. 
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env['token'];
const GUILD_ID = process.env['guild_id'];
const CLIENT_ID = process.env['client_id'];
const { Client, Intents } = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS]});

const commands = [ ]; 

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
});

/*client.on("event type", function(parameter){  --for creating event listeners
    function code
});
*/

client.on("GuildMemberAdd", function(member) {
  /* add in code */ 
  client.channels.cache.get(`904814161740038175`).send(`Welcome to the Discord channel for London chapter of Codecademy ${member.displayName}! You can introduce yourself in the introduction section, there's a general channel to talk all sorts code, and places to talk about goals or recieve feedback on projects :)`)
}) /* change to message their DM, so i don't flood a channel with the same message*/ 
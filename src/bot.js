require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { hello } = require('./commands/message/hello');
const { encouragement } = require('./commands/message/encouragement');

const { TOKEN, GUILD_ID, CLIENT_ID } = process.env;
if (!TOKEN || !GUILD_ID || !CLIENT_ID) {
  throw new Error('Invalid or missing environment variable');
}

// Creating a new client instance and setting bot permissions, do not edit bot permissions without approval, we must keep these to a minimum for security. 
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS], });

//Creates a list of all file names in commands/slash
commands = [];
client.commands = new Collection();
const slashCommandFiles = fs.readdirSync('./src/commands/slash').filter(file => file.endsWith('.js'));

//edits string of each file name to the name set to the slash command in file (used in slash command handler).
for (const file of slashCommandFiles) {
  const command = require(`./commands/slash/${file}`);
  client.commands.set(command.data.name, command);
}

//creates json list with information of each slash command (used for updating slash command info in guild)
for (const file of slashCommandFiles) {
  const command = require(`./commands/slash/${file}`);
  commands.push(command.data.toJSON());
}

//Code to update slash commands for client_id (bot) in server (guild_id)
const rest = new REST({ version: '9' }).setToken(TOKEN);
 
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

//Console log to show client is ready when it logs on. 
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//incteractionCreate will cause an interraction when slash commands are used
client.on('interactionCreate', async (interaction) => {

  //returns nothing if no command with interaction
  if (!interaction.isCommand()) return;

  //fetches the command in the collection with slash command used
  const command = client.commands.get(interaction.commandName);

  // returns if command is undefined, meaning the command did not exist in the collection
  if (!command) return;

  const { commandName, options } = interaction;

  //run the execute method inside slash command object
  try {
    await command.execute(interaction, options);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while attempting to execute this command!', ephemeral: true });
  }
});

//messageCreate causes the bot to react whenever a message is posted in the server, add commands here if reacting to messages, you can specify channels if required. 
client.on('messageCreate', async message => {
  //sadwords
  const sadWords = ["sad", "depressed","unhappy", "angry", "miserable", "stressed", "under the weather", "swamped", "anxious", "exhausted"];
  //returns nothing if the message was sent by the bot.
  if (message.author.id === client.user.id) return;

  if (message.content === '!hello') {
    hello(message);
  };
//encouragement
  if (sadWords.some(word => message.content.includes(word))){
    encouragement(message);
  };

});

//guildMemberAdd causes the bot to register an event occuring when someone joins the server on discord, any commands in here will run when someone joins. Only welcome message code in here, do not edit this section below unless a feature gets approval. 
client.on('guildMemberAdd', async member => {
  //send messages to the user who joined. 
  member.send(`Welcome to the Codecademy London Chapter!`);
  console.log("Someone has joined the guild");
});


//bot logs onto discord here if code is ran without any errors.
client.login(TOKEN);
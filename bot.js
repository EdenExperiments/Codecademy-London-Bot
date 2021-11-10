const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const token = process.env['token']
const GUILD_ID = process.env['guild_id'];
const CLIENT_ID = process.env['client_id'];
const { hello }  = require('./commands/message/hello');

// Creating a new client instance and setting bot permissions, do not edit bot permissions without approval, we must keep these to a minimum for security. 
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],});

//Creates a list of all file names in commands/slash
client.commands = new Collection();
const slashCommandFiles = fs.readdirSync('./commands/slash').filter(file => file.endsWith('.js'));

//edits string of each file name to the name set to the slash command in file
for (const file of slashCommandFiles) {
  const command = require(`./commands/slash/${file}`);
  client.commands.set(command.data.name, command);
}

//Console log to show client is ready when it logs on. 
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


//incteractionCreate will cause an interraction when slash commands are used, add commands here if reacting to slash commands.
client.on('interactionCreate', async interaction => {

  //does nothing if no command with interaction
  if (!interaction.isCommand()) return;

  //fetches the command in the collection with slash command used
  const command = client.commands.get(interaction.commandName);

  // returns if command is undefined, meaning the command did not exist in the collection
  if (!command) return;

  //run the execute method inside slash command object
  try {
    await command.execute(interaction);
  } catch(error) {
    console.error(error);
    await interaction.reply({content: 'There was an error while attempting to execute this command!', ephemeral: true});
  }
});

//messageCreate causes the bot to react whenever a message is posted in the server, add commands here if reacting to messages, you can specify channels if required. 
client.on('messageCreate', async message => {
  //returns nothing if the message was sent by the bot.
  if (message.author.id === client.user.id) return;

  if (message.content === '!hello') {
    hello(message);
  };
});

//guildMemberAdd causes the bot to register an event occuring when someone joins the server on discord, any commands in here will run when someone joins. Only welcome message code in here, do not edit this section below unless a feature gets approval. 
client.on('guildMemberAdd', async member => {
  //send messages to the user who joined. 
  member.send(`Welcome to the Codecademy London Chapter!`);
  console.log("Someone has joined the guild");
});


//bot logs on here if code is ran without any errors.
client.login(token);
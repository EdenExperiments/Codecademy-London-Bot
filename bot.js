const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const token = process.env['token']


// Creating a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/slash').filter(file => file.endsWith('.js'));


//Console log to show client is ready when it logs on. 
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


//Creating a list of all command files in the commands folder.
for (const file of commandFiles) {
  const command = require(`./commands/slash/${file}`);
  client.commands.set(command.data.name, command);
}

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

  if (message.author.id === client.user.id) return;
  
  

});

//guildMemberAdd causes the bot to register an event occuring when someone joins the server on discord, any commands in here will run when someone joins.
client.on('guildMemberAdd', async member => {
  member.createDM()
  console.log("Someone has joined the guild")
});


//bot logs on here if code is ran without any errors.
client.login(token);
require('dotenv').config();
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, Intents, Interaction } from 'discord.js';
import { commands } from './commands/slash';
import { hello } from './commands/message/hello';
import { encouragement } from './commands/message/encouragement';
import type { SlashCommand } from './types';

const { TOKEN, GUILD_ID, CLIENT_ID } = process.env;
if (!TOKEN || !GUILD_ID || !CLIENT_ID) {
  throw new Error('Invalid or missing environment variable');
}

// Create a client instance and set permissions. Do not edit permissions without approval.
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS
  ]
});

registerCommands(commands, CLIENT_ID, GUILD_ID, TOKEN);
client.login(TOKEN);

//Console log to show client is ready when it logs on. 
client.once('ready', () => {
  if (client && client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  }
});

//incteractionCreate will cause an interraction when slash commands are used
client.on('interactionCreate', async (interaction: Interaction) => {

  //returns nothing if no command with interaction
  if (!interaction.isCommand()) return;

  await interaction.deferReply();

  const { commandName, options } = interaction;
  const slashCommand = commands.find((c) => {
    return c.name === commandName;
  });

  if (!slashCommand) {
    await interaction.followUp({
      ephemeral: true,
      content: "Invalid command"
    });
    return;
  }

  try {
    if (!slashCommand.execute) {
      throw new Error('Invalid execute command')
    }
    await slashCommand.execute(client, interaction, options);
  } catch (e) {
    console.error(e);
    await interaction.followUp({
      ephemeral: true,
      content: 'Error attempting to execute command', 
    });
  }
});

//messageCreate causes the bot to react whenever a message is posted in the server, add commands here if reacting to messages, you can specify channels if required. 
client.on('messageCreate', async message => {
  //sadwords
  const sadWords = ["sad", "depressed","unhappy", "angry", "miserable", "stressed", "under the weather", "swamped", "anxious", "exhausted"];
  //returns nothing if the message was sent by the bot.
  if (message.author.id === client?.user?.id) return;

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

// Register slash commands and print a list of available guild commands
async function registerCommands(
  commands: SlashCommand[],
  clientID: string,
  guildID: string,
  token: string
): Promise<void> {

  const rest = new REST({ version: '9' }).setToken(token);

  // push new commands
  try {
    await rest.put(
      Routes.applicationGuildCommands(clientID, guildID),
      { body: commands }
    );
  } catch (e) {
    console.error(e);
  }

  // log guild command list
  try {
    const guildCommands = await rest.get(
      Routes.applicationGuildCommands(clientID, guildID)
    );
    if (Array.isArray(guildCommands)) {
      console.log('Available guild commands: ');
      for (const command of guildCommands) {
        console.log(` - ${command.name}`);
      }
    }
  } catch (e) {
    console.error(e);
  }
}


import { Client, Message } from 'discord.js';
import { hello } from '../commands/message/hello.js';
import { encouragement } from '../commands/message/encouragement.js';

// messageCreate causes the bot to react whenever a message is posted in the server, add commands here if reacting to messages, you can specify channels if required. 
export default async function handleMessageCreate(message: Message, client: Client) {
  // sadwords
  const sadWords = ["sad", "depressed", "unhappy", "angry", "miserable", "stressed", "under the weather", "swamped", "anxious", "exhausted"];
  // returns nothing if the message was sent by the bot.
  if (message.author.id === client?.user?.id) return;

  if (message.content === '!hello') {
    hello(message);
  };
  // encouragement
  if (sadWords.some(word => message.content.includes(word))){
    encouragement(message);
  };
}

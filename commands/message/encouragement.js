//async function for encouragement messages
const encouragements = [
  "Cheer up!",
  "Hang in there.",
  "Don't give up.",
  "You got this",
  "This is tough, but you're tougher",
  "Sending some good bytes",
  "Stay strong"
]

async function encouragement(message){
  const randEnc = encouragements[Math.floor(Math.random() * encouragements.length)];
  message.reply(randEnc);
  message.react("🥺");
};


//code to export your function for use in bot.js
module.exports = { encouragement }

//create async function and include functionality in here. If your code will work as well with a slash command please use that instead and not this. 
async function hello(message) {
  message.channel.send(`Hello ${message.author}, I am Codecademy London Bot, thank you for saying hello`);
  message.react('😄');
};


//code to export your function for use in bot.js
module.exports = { hello }
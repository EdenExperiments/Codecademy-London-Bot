// add this in all slash command files to use to build the slash command
const { SlashCommandBuilder } = require('@discordjs/builders');

//Use this as a guideline on how to accept inputs into slash commands, you can replace .addStringOption to .addIntegerOption and other data types. 

//exporting the slash command object it is set to equal
const optionscheck = new SlashCommandBuilder()
  .setName('optionscheck') //setting name of slash command
  .setDescription('testing options')
  .addStringOption(option => option.setName('choice1').setDescription('Your option 1').setRequired(true))
  .addStringOption(option => option.setName('choice2').setDescription('Second choice').setRequired(true))
  .addStringOption(option => option.setName('optionalchoice').setDescription('An optional choice with no .require()'));

const execute = async (client, interaction, options) => {
  const choice1 = options.getString('choice1');
  const choice2 = options.getString('choice2');
  const optionalchoice = options.getString('optionalchoice'); //will === null if no input was entered.

  if (optionalchoice) {
    await interaction.followUp(`You have submitted choices of ${choice1}, ${choice2} and optional choice ${optionalchoice}`);
  } else {
    await interaction.followUp(`You have submitted choices of ${choice1}, and ${choice2}!`);
  };
};

optionscheck.execute = execute;

module.exports = optionscheck;

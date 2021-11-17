// add this in all slash command files to use to build the slash command
const { SlashCommandBuilder } = require('@discordjs/builders');


//jokes
const jokes=[
  "I'm thinking of reasons to go to Switzerland. The flag is a big plus.",
  "What rock group has four men that don't sing? Mount Rushmore",
  "What concert costs just 45 cents? 50 Cent featuring Nickelback!",
  "How many apples grow on a tree? ...All of them!",
  "I like telling Dad jokes. Sometimes he laughs!",
  "q. Why was the JavaScript developer sad? a. Because he didn't Node how to Express himself",
  "To whoever stole my copy of Microsoft Office, I will find you. You have my Word!",
  "q. Why did the developer go broke? a. Because he used up all his cache",
  "When my son told me to stop impersonating a flamingo, I had to put my foot down.",
  "What did one hat say to another? You wait here, I'll go on a head",
  "Someone stole my mood ring... I don't knw how I feel about it",
  "Why didi the programmer quit his job? Because he didn´t get arrays",
  "Chuck Norris writes code... that optimises itself",
];

// set a random number and get a joke from the array

//exporting the slash command object it is set to equal
module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke') // name of slash command
		.setDescription('Returns a joke!'),

    //async function, this is where your code for the functionality of the feature will go.
	async execute(interaction) {
    const randJoke = jokes[Math.floor(Math.random() * jokes.length)];
		await interaction.reply({ content: randJoke, ephemeral: true });
	},
};
// add this in all slash command files to use to build the slash command
const { SlashCommandBuilder } = require('@discordjs/builders');

//exporting the slash command object it is set to equal
const cointoss = new SlashCommandBuilder()
	.setName('cointoss') // name of slash command
	.setDescription('Tosses a coin.');

//async function, this is where your code for the functionality of the feature will go.
const execute = async (client, interaction) => {
	const rand = n => Math.floor(Math.random()*n)
	const choose = xs => xs[rand(xs.length)]

	await interaction.followUp({ content: choose(['Heads','Tails']), ephemeral: true });
};

cointoss.execute = execute;

module.exports = cointoss;

// add this in all slash command files to use to build the slash command
const { SlashCommandBuilder } = require('@discordjs/builders');

const rand = n => Math.floor(Math.random()*n)
const choose = xs => xs[rand(xs.length)]

//exporting the slash command object it is set to equal
module.exports = {
	data: new SlashCommandBuilder()
		.setName('cointoss') // name of slash command
		.setDescription('Tosses a coin.'),

    //async function, this is where your code for the functionality of the feature will go.
	async execute(interaction) {
		await interaction.reply({ content: choose(['Heads','Tails']), ephemeral: true });
	},
};
// add this in all slash command files to use to build the slash command
const { SlashCommandBuilder } = require('@discordjs/builders');

//exporting the slash command object it is set to equal
module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke') // name of slash command
		.setDescription('Returns a joke!'),

    //async function, this is where your code for the functionality of the feature will go.
	async execute(interaction) {
		await interaction.reply({ content: 'funny joke!', ephemeral: true });
	},
};
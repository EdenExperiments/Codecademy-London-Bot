// add this in all slash command files to use to build the slash command
const { SlashCommandBuilder } = require('@discordjs/builders');

//exporting the slash command object it is set to equal
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping') //setting name of slash command
		.setDescription('Replies with Pong!'), //setting description of slash command, will come up when used on discord

    //async function, this is where your code for the functionality of the feature will go.
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};

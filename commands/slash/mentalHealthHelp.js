const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mentalhealthhelp')
		.setDescription('Replies privately with a list of mental health help resources for the UK and other countries.'), 
	async execute(interaction) {
    await interaction.reply({content: 'Although I am a bot, I am glad you are seeking help. Only you can see this command, please view your DM for information in getting help.', ephemeral: true});

		await interaction.member.send(`
As creators of this bot, we are glad you are seeking help if you are experiencing hard times.
Below you will find information for seeking help within the UK, we hope this is of help to you. Your message to access this command has been hidden for your privacy. 

UK Helplines/websites:

NHS Urgent help (England Only):     
https://www.nhs.uk/service-search/mental-health/find-an-urgent-mental-health-helpline

Samaritans:
https://www.samaritans.org/how-we-can-help/contact-samaritan/

Mind online community:
https://www.mind.org.uk/information-support/side-by-side-our-online-community/

More Helplines and crisis contacts:
https://www.centreformentalhealth.org.uk/helplines-and-crisis-contacts
   `);
	},
};

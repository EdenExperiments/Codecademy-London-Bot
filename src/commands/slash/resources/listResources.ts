import { 
  BaseCommandInteraction,
  MessageEmbed
} from 'discord.js';
import { DataSource } from 'typeorm';
import Resource from '../../../entities/Resource';
import handleError from '../../../handlers/handleError';

export default async function listResources(
  interaction: BaseCommandInteraction, 
  connection: DataSource
): Promise<void> {
  try {
    const resourceRepository = connection.getRepository(Resource);
    const resources = await resourceRepository
      .createQueryBuilder("resources")
      .leftJoinAndSelect("resources.resourceCategories", "resourceCategories")
      .getMany();

    // MessageEmbed is limited to 10 per message 
    const messageEmbed: MessageEmbed[] = [];
    for (let i = 0; i < resources.length && i < 10; i++) {
      const tmp = new MessageEmbed()
        .setColor('#0099ff')
        .setURL(resources[i].url)
        .setTitle(resources[i].title)
        .setDescription(resources[i].description)
        .setThumbnail(resources[i].img)
        .setTimestamp(resources[i].created_at);

      // MessageEmbed field values must be non empty string
      if (resources[i].resourceCategories.length) {
        const categories = resources[i].resourceCategories
          .map(e => e.category)
          .join(', ');
        tmp.addFields({ 
          name: 'Categories',
          value: categories
        });
      }
      messageEmbed.push(tmp);
    }

    await interaction.followUp({ 
      content: 'Available resources',
      embeds: messageEmbed
    })
  } catch (e) {
    await handleError(interaction, e.message);
    return;
  }
}


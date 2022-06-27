import { 
  BaseCommandInteraction,
  MessageEmbed
} from 'discord.js';
import { DataSource } from 'typeorm';
import Resource from '../../../entities/Resource';
import handleError from '../../../handlers/handleError';

export default async function searchResources(
  interaction: BaseCommandInteraction, 
  connection: DataSource,
  data: string|null
): Promise<void> {

  let categories: string[] = [];
  if (data && data.length) {
    categories = data
      .toLowerCase()
      .split(/\,\s|\,|\s/g)
      .filter(e => e);
  }

  if (!categories.length) {
    await interaction.followUp({ 
      content: 'Invalid category'
    });
    return;
  }

  const resourceRepository = connection.getRepository(Resource);
  let resources: Resource[] = [];
  try {
    resources = await resourceRepository
      .createQueryBuilder("resources")
      .innerJoinAndSelect("resources.resourceCategories", "resourceCategories")
      .where("lower(resourceCategories.category) LIKE ANY (ARRAY[:...categories])", { 
        categories
      })
      .getMany();
  } catch (e) {
    await handleError(interaction, e.message);
    return;
  }

  const messageEmbed: MessageEmbed[] = [];
  try {
    for (const row of resources) {
      const tmp = new MessageEmbed()
        .setColor('#0099ff')
        .setURL(row.url)
        .setTitle(row.title)
        .setDescription(row.description)
        .setThumbnail(row.img)
        .setTimestamp(row.created_at);

      // MessageEmbed field values must be non empty string
      if (row.resourceCategories.length) {
        const categories = row.resourceCategories.map(e => e.category).join(', ');
        tmp.addFields({ 
          name: 'Matched categories', 
          value: categories
        });
      }
      messageEmbed.push(tmp);
    }
  } catch (e) {
    await handleError(interaction, e.message);
    return;
  }

  await interaction.followUp({ 
    content: messageEmbed.length ? 'Resources:' : 'No resources found',
    embeds: messageEmbed
  });
  return;
}

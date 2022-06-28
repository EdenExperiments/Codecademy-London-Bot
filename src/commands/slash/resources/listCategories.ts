import { 
  MessageEmbed,
  BaseCommandInteraction
} from 'discord.js';
import { DataSource } from 'typeorm';
import ResourceCategory from '../../../entities/ResourceCategory';
import handleError from '../../../handlers/handleError';

export default async function listCategories(
  interaction: BaseCommandInteraction, 
  connection: DataSource
): Promise<void> {
  try {
    const resourceCategoryRepository = connection.getRepository(ResourceCategory);
    const resourceCategories = await resourceCategoryRepository
      .createQueryBuilder("resourceCategories")
      .where("resourceCategories.deleted_at IS NULL")
      .getMany();

    const messageEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Available resource categories')
      .setTimestamp();

    const fields = resourceCategories.map(e => e.category).join(', ');
    messageEmbed.addFields({ name: 'Categories', value: fields });

    await interaction.followUp({ 
      content: 'Available resources',
      embeds: [ messageEmbed ]
    })
  } catch (e) {
    await handleError(interaction, e.message);
    return;
  }
}


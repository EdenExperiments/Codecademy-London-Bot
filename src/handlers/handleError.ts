import { 
  BaseCommandInteraction
} from 'discord.js';

export default async function handleError(
  interaction: BaseCommandInteraction,
  msg: string
): Promise<void> {
  await interaction.followUp({
    content: 'Error: ' + msg,
    ephemeral: true
  });
}

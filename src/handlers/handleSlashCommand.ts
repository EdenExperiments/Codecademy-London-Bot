import { 
  Client,
  CommandInteraction
} from 'discord.js';
import { DataSource } from 'typeorm';
import type { SlashCommand } from '../types';

export default async function handleSlashCommand(
  client: Client,
  interaction: CommandInteraction,
  connection: DataSource,
  commands: SlashCommand[]
): Promise<void> {

  await interaction.deferReply();

  const { commandName, options } = interaction;
  const slashCommand = commands.find((c) => {
    return c.name === commandName;
  });

  if (!slashCommand) {
    await interaction.followUp({
      ephemeral: true,
      content: "Invalid command"
    });
    return;
  }

  try {
    if (!slashCommand.execute) {
      throw new Error('Invalid execute function')
    }
    await slashCommand.execute(client, interaction, connection, options);
  } catch (error) {
    console.error(error);
    await interaction.followUp({
      ephemeral: true,
      content: 'Error attempting to execute command', 
    });
  }
}
import { 
  Client,
  CacheType,
  BaseCommandInteraction,
  ChatInputApplicationCommandData,
  CommandInteractionOptionResolver
} from 'discord.js';
import { DataSource } from 'typeorm';

// execute function signature
interface SlashCommandExecutable {
  (
    client: Client, 
    interaction: BaseCommandInteraction,
    connection: DataSource,
    options?: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">
  ): Promise<void>;
}

export interface SlashCommand extends ChatInputApplicationCommandData {
  execute: SlashCommandExecutable
} 

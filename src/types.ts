import { 
  Client,
  CacheType,
  BaseCommandInteraction,
  ChatInputApplicationCommandData,
  CommandInteractionOptionResolver
} from 'discord.js';

// execute function signature
interface SlashCommandExecutable {
  (
    client: Client, 
    interaction: BaseCommandInteraction,
    options?: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">
  ): Promise<void>;
}

export interface SlashCommand extends ChatInputApplicationCommandData {
  execute: SlashCommandExecutable
} 

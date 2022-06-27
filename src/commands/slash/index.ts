import { ping } from "./ping";
import joke from "./joke";
import cointoss from "./cointoss";
import optionscheck from "./optionscheck";
import mentalHealthHelp from "./mentalHealthHelp";
import breakReminder from "./breakReminder";
import type { SlashCommand } from '../../types';

// js exports
const jscmds = [
  joke,
  optionscheck,
  mentalHealthHelp,
  cointoss,
  breakReminder 
] as unknown as SlashCommand[];

// ts exports
export const commands: SlashCommand[] = [
  ping,
  ...jscmds
];

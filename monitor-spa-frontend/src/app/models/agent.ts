import { Conversation } from './conversation';

export class Agent {
  id!: string;
  firstName!: string;
  lastName!: string;
  conversations!: Conversation[];
}

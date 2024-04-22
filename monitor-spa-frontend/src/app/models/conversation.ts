import { AnswerState, ConversationState } from '../models';

export class Conversation {
  fullName!: string;
  state!: ConversationState;
  answerState!: AnswerState;
  lastUpdatedDateTime!: string;
  senderWasOwner!: boolean;
}

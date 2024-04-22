import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AnswerState } from '../../models';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [NgIf, NgClass, TimerComponent],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent {

  @Input() fullName!: string;
  @Input() answerState!: AnswerState;
  @Input() lastUpdatedDateTime!: string;
  @Input() senderWasOwner!: boolean;
  conversationIsNew!: boolean;

  ngOnInit(): void {
    this.updateConversationIsNew();
  }

  private updateConversationIsNew(): void {
    this.conversationIsNew = this.answerState === AnswerState.unknown;
  }
}

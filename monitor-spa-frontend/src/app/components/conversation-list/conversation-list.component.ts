import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Conversation } from '../../models';
import { ConversationComponent } from '../conversation/conversation.component';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [NgFor, ConversationComponent],
  templateUrl: './conversation-list.component.html'
})
export class ConversationListComponent {

  @Input() conversations!: Conversation[];
}

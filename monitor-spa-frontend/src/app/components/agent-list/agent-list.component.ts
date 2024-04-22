import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Agent } from '../../models';
import { AgentComponent } from '../agent/agent.component';
import { ConversationListComponent } from '../conversation-list/conversation-list.component';

@Component({
  selector: 'app-agent-list',
  standalone: true,
  imports: [NgFor, AgentComponent, ConversationListComponent],
  templateUrl: './agent-list.component.html',
  styleUrl: './agent-list.component.scss'
})
export class AgentListComponent {

  @Input() agents!: Agent[];
}

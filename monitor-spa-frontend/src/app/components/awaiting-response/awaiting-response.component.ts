import { Component, Input } from '@angular/core';
import { Agent } from '../../models';
import { AgentListComponent } from '../agent-list/agent-list.component';

@Component({
  selector: 'app-awaiting-response',
  standalone: true,
  imports: [AgentListComponent],
  templateUrl: './awaiting-response.component.html',
  styleUrl: './awaiting-response.component.scss'
})
export class AwaitingResponseComponent {

  @Input() header!: string;
  @Input() agents!: Agent[];
}

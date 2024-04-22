import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-agent',
  standalone: true,
  imports: [],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.scss'
})
export class AgentComponent {

  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() picture!: string;
}

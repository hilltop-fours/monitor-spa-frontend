import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAgentService } from '../../interfaces';
import MockAgents from '../../mock/mock-awaiting-response.json';
import { Agent } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AgentService implements IAgentService {

  agents: Agent[] = MockAgents;

  getAgents(): Observable<Agent[]> { return of(this.agents); }
}

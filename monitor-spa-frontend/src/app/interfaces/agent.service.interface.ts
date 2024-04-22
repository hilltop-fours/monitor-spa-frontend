import { Observable } from 'rxjs';
import { Agent } from '../models';

export interface IAgentService {
  getAgents(subscriptionId: number): Observable<Agent[]>;
}

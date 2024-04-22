import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAgentService } from '../../interfaces';
import { Agent } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AgentService implements IAgentService {
  url = environment.api;

  constructor(private readonly http: HttpClient) { }


  getAgent(subscriptionId: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.url}/chat/${subscriptionId}`);
  }

  getAgents(subscriptionId: number): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.url}/chat/${subscriptionId}`);
  }
}

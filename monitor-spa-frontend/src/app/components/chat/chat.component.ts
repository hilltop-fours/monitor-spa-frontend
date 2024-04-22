import { NgFor } from '@angular/common';
import { Component, OnInit, Input as RouterInput } from '@angular/core';
import { Agent, ConversationState } from '../../models';
import { SignalRService } from '../../services';
import { AgentService } from '../../services/agent/agent.service.mock';
import { Utils } from '../../utils';
import { AwaitingResponseComponent } from '../awaiting-response/awaiting-response.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, AwaitingResponseComponent],
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  @RouterInput() subscriptionId!: number;

  private agents: Agent[] = [];
  // private agent$!: Agent;

  customerAwaitingResponse: Agent[] = [];
  csrAwaitingResponse: Agent[] = [];

  constructor(
    private readonly agentService: AgentService,
    private readonly signalRService: SignalRService) {
  }

  ngOnInit(): void {
    this.agentService
      .getAgents()
      .subscribe({
        next: (data: Agent[]) => this.agents = data,
        error: (err: Error) => console.error(`Observer got an error: ${err}`),
        complete: () => this.updateAwaitingResponses(this.agents)
      });

    this.signalRService.subject
      .subscribe(data => {
        const agent = JSON.parse(JSON.stringify(data));
        const agents: Agent[] = this.updateAgent(this.agents, agent);
        this.updateAwaitingResponses(agents);
      });

    // this.signalRService.on('updateAgent')
    //  .subscribe({
    //    next: (data: Agent) => this.agent$ = data,
    //    error: (err: Error) => console.error(`Observer got an error: ${err}`),
    //    complete: () => {
    //      const agent = JSON.parse(JSON.stringify(this.agent$));
    //      const agents: Agent[] = this.updateAgent(this.agents, agent);
    //      this.updateAwaitingResponses(agents);
    //    }
    //  });
  }


  private updateAwaitingResponses(agents: Agent[]): void {
    if (agents.length > 0) {
      this.agents = this.organizeAgents(agents);
      this.customerAwaitingResponse = this.getAwaitingResponseAgents(agents, false);
      this.csrAwaitingResponse = this.getAwaitingResponseAgents(agents, true);
    }
  }

  private getAgentIndex(agents: Agent[], agent: Agent): number {
    return agents.findIndex(a => a.id = agent.id);
  }

  private updateAgent(agents: Agent[], agent: Agent): Agent[] {
    const index: number = this.getAgentIndex(agents, agent);
    agents[index] = agent;
    return agents;
  }

  private organizeAgents(agents: Agent[]): Agent[] {
    agents = this.sortAgentsAlphabetical(agents);
    agents = this.sortConversationsByTime(agents);
    agents = this.sortConversationsByNew(agents);
    agents = this.removeConversationsStateNotOpen(agents);
    agents = this.removeAgentsNoConversations(agents);
    return agents;
  }

  private sortAgentsAlphabetical(agents: Agent[]): Agent[] {
    return agents.sort(
      (a, b,) => a.firstName.localeCompare(b.firstName)
    );
  }

  private sortConversationsByTime(agents: Agent[]): Agent[] {
    return agents.map(agent => {
      agent.conversations.sort(
        (a, b) => (Utils.getElapsedMilliseconds(b.lastUpdatedDateTime) - Utils.getElapsedMilliseconds(a.lastUpdatedDateTime))
      );
      return agent;
    });
  }

  private sortConversationsByNew(agents: Agent[]): Agent[] {
    return agents.map(agent => {
      agent.conversations.sort(
        (a, b) => (a.answerState - b.answerState)
      );
      return agent;
    });
  }

  private removeAgentsNoConversations(agents: Agent[]): Agent[] {
    return agents.filter(agent => agent.conversations.length);
  }

  private removeConversationsStateNotOpen(agents: Agent[]): Agent[] {
    agents = JSON.parse(JSON.stringify(agents));
    agents.map(agent => {
      agent.conversations = agent.conversations.filter(conversation => conversation.state === ConversationState.open);
      return agent;
    });
    return agents;
  }

  private getAwaitingResponseAgents(agents: Agent[], sender: boolean): Agent[] {
    agents = JSON.parse(JSON.stringify(agents));
    agents.map(agent => {
      agent.conversations = agent.conversations.filter(conversation => conversation.senderWasOwner === sender);
      return agent;
    });
    return this.removeAgentsNoConversations(agents);
  }
}

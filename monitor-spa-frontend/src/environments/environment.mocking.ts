import { AgentService, AgentService as MockAgentService } from '../app/services';

export const environment = {
  production: false,
  api: null,
  providers: [
    { provide: AgentService, useClass: MockAgentService }
  ]
};

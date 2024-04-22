import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import MockAgents from '../mock/mock-awaiting-response.json';
import { AgentService } from './agent.service';
import { AgentService as MockChatService } from './agent.service.mock';

describe('AgentService ', () => {
  let service: AgentService;
  const subscriptionId = 17;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: HttpClientTestingModule },
        { provide: AgentService, useClass: MockChatService }
      ]
    });
    service = TestBed.inject(AgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAgents should return value from observable', (done: DoneFn) => {
    service.getAgents(subscriptionId).subscribe(value => {
      expect(value).toEqual(MockAgents);
      done();
    });
  });
});

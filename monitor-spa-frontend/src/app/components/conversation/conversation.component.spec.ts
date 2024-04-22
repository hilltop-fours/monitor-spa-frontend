import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConversationComponent } from '../../components';
import { AnswerState, Conversation, ConversationState } from '../../models';

@Component({
  template: `
  <app-conversation [fullName]="conversation.fullName" [answerState]="conversation.answerState" [lastUpdatedDateTime]="conversation.lastUpdatedDateTime"></app-conversation>`
})
class TestHostComponent {
  conversation: Conversation = {
    fullName: 'Alfa',
    state: ConversationState.open,
    answerState: AnswerState.unknown,
    lastUpdatedDateTime: '2020-01-01T12:00:00Z',
    senderWasOwner: false
  };
}

describe('ConversationComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversationComponent, TestHostComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('component view should have fullName value', () => {
    expect(fixture.nativeElement.querySelector('.conversation__full-name').innerText).toBe('');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.conversation__full-name').innerText).toBe('Alfa');
  });

  it('should show new badge if answer state is unknown', () => {
    component.conversation.answerState = AnswerState.unknown;

    expect(fixture.nativeElement.querySelector('.conversation__badge').innerText).toBe('');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.conversation__badge').innerText).toBe('NEW');
  });

  it('should not show new badge if answer state is on time', () => {
    component.conversation.answerState = AnswerState.onTime;

    expect(fixture.nativeElement.querySelector('.conversation__badge').innerText).toBe('');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.conversation__badge').innerText).toBe('');
  });

  it('should not show new badge if answer state is too late', () => {
    component.conversation.answerState = AnswerState.tooLate;

    expect(fixture.nativeElement.querySelector('.conversation__badge').innerText).toBe('');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.conversation__badge').innerText).toBe('');
  });
});

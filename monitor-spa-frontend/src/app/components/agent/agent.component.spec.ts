import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentComponent } from '../../components';

@Component({
  template: `<app-agent [firstName]="firstName" [lastName]="lastName"></app-agent>`
})
class TestHostComponent {
  firstName = 'Alfa';
  lastName = 'Bravo';
}

describe('AgentComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentComponent, TestHostComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('component view should have firstName value', () => {
    expect(fixture.nativeElement.querySelector('.agent__first-name').innerText).toBe('');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.agent__first-name').innerText).toBe('Alfa');
  });

  it('component view should have lastName value', () => {
    expect(fixture.nativeElement.querySelector('.agent__last-name').innerText).toBe('');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.agent__last-name').innerText).toBe('Bravo');
  });
});

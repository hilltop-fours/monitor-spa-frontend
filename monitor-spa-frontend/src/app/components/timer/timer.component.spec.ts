import { Component } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateTime } from 'luxon';
import { TimerComponent } from '../../components';

@Component({
  template: `<app-timer [lastUpdatedDateTime]="lastUpdatedDateTime" [isNew]="isNew"></app-timer>`
})
class TestHostComponent {
  isNew!: boolean;
  lastUpdatedDateTime!: string;
}

describe('TimerComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerComponent, TestHostComponent]
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

  it('should set timer 2 minutes', fakeAsync(() => {
    component.lastUpdatedDateTime = DateTime.utc().minus({ minutes: 2 }).toString();
    component.isNew = false;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.timer').innerText).toBe(':');
    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.timer').innerText).toBe('02:00');

    discardPeriodicTasks();
  }));

  it('should be on time', fakeAsync(() => {
    component.lastUpdatedDateTime = DateTime.utc().minus({ minutes: 2, seconds: 59 }).toString();
    component.isNew = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.timer')).nativeElement.classList.contains('on-time')).toBeFalse();
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.timer')).nativeElement.classList.contains('on-time')).toBeTrue();

    discardPeriodicTasks();
  }));

  it('should be too late', fakeAsync(() => {
    component.lastUpdatedDateTime = DateTime.utc().minus({ minutes: 3, seconds: 1 }).toString();
    component.isNew = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.timer')).nativeElement.classList.contains('too-late')).toBeFalse();
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.timer')).nativeElement.classList.contains('too-late')).toBeTrue();

    discardPeriodicTasks();
  }));

  it('should be new', fakeAsync(() => {
    component.lastUpdatedDateTime = DateTime.utc().toString();
    component.isNew = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.timer')).nativeElement.classList.contains('new')).toBeFalse();
    component.isNew = true;
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.timer')).nativeElement.classList.contains('new')).toBeTrue();

    discardPeriodicTasks();
  }));
});

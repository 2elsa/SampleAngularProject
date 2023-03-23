import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobHistoryItemDisplayComponent } from './job-history-item-display.component';

describe('JobHistoryItemDisplayComponent', () => {
  let component: JobHistoryItemDisplayComponent;
  let fixture: ComponentFixture<JobHistoryItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobHistoryItemDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobHistoryItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistDialogDisplayComponent } from './checklist-dialog-display.component';

describe('ChecklistDialogDisplayComponent', () => {
  let component: ChecklistDialogDisplayComponent;
  let fixture: ComponentFixture<ChecklistDialogDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistDialogDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistDialogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

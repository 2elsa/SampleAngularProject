import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiobuttonDialogDisplayComponent } from './radiobutton-dialog-display.component';

describe('RadiobuttonDialogDisplayComponent', () => {
  let component: RadiobuttonDialogDisplayComponent;
  let fixture: ComponentFixture<RadiobuttonDialogDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiobuttonDialogDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonDialogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

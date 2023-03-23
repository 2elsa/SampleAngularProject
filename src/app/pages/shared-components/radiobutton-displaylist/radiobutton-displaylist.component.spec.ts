import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiobuttonDisplaylistComponent } from './radiobutton-displaylist.component';

describe('RadiobuttonDisplaylistComponent', () => {
  let component: RadiobuttonDisplaylistComponent;
  let fixture: ComponentFixture<RadiobuttonDisplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiobuttonDisplaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonDisplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

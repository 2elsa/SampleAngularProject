import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxDisplaylistComponent } from './checkbox-displaylist.component';

describe('CheckboxDisplaylistComponent', () => {
  let component: CheckboxDisplaylistComponent;
  let fixture: ComponentFixture<CheckboxDisplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxDisplaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxDisplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

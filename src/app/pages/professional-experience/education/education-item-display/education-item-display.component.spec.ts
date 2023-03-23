import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationItemDisplayComponent } from './education-item-display.component';

describe('EducationItemDisplayComponent', () => {
  let component: EducationItemDisplayComponent;
  let fixture: ComponentFixture<EducationItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationItemDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

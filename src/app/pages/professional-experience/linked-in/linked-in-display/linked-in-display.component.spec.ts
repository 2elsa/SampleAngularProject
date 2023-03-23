import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedInDisplayComponent } from './linked-in-display.component';

describe('LinkedInDisplayComponent', () => {
  let component: LinkedInDisplayComponent;
  let fixture: ComponentFixture<LinkedInDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedInDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedInDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

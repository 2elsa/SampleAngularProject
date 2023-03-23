import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewManagerComponent } from './review-manager.component';

describe('ReviewManagerComponent', () => {
  let component: ReviewManagerComponent;
  let fixture: ComponentFixture<ReviewManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

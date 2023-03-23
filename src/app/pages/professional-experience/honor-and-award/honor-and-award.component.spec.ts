import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonorAndAwardComponent } from './honor-and-award.component';

describe('HonorAndAwardComponent', () => {
  let component: HonorAndAwardComponent;
  let fixture: ComponentFixture<HonorAndAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HonorAndAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HonorAndAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

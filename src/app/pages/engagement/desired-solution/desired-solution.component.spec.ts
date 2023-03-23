import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesiredSolutionComponent } from './desired-solution.component';

describe('DesiredSolutionComponent', () => {
  let component: DesiredSolutionComponent;
  let fixture: ComponentFixture<DesiredSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesiredSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesiredSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

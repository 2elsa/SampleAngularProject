import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyDisplayComponent } from './biography-display.component';

describe('BiographyDisplayComponent', () => {
  let component: BiographyDisplayComponent;
  let fixture: ComponentFixture<BiographyDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiographyDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiographyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

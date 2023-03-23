import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrdComponent } from './crd.component';

describe('CrdComponent', () => {
  let component: CrdComponent;
  let fixture: ComponentFixture<CrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

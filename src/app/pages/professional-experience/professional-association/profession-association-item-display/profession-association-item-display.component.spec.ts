import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionAssociationItemDisplayComponent } from './profession-association-item-display.component';

describe('ProfessionAssociationItemDisplayComponent', () => {
  let component: ProfessionAssociationItemDisplayComponent;
  let fixture: ComponentFixture<ProfessionAssociationItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionAssociationItemDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionAssociationItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStoryComponent } from './top-story.component';

describe('TopStoryComponent', () => {
  let component: TopStoryComponent;
  let fixture: ComponentFixture<TopStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedModalComponentComponent } from './feed-modal-component.component';

describe('FeedModalComponentComponent', () => {
  let component: FeedModalComponentComponent;
  let fixture: ComponentFixture<FeedModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedModalComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

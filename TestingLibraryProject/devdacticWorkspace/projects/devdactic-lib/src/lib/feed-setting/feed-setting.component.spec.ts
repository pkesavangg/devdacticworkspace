import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedSettingComponent } from './feed-setting.component';

describe('FeedSettingComponent', () => {
  let component: FeedSettingComponent;
  let fixture: ComponentFixture<FeedSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

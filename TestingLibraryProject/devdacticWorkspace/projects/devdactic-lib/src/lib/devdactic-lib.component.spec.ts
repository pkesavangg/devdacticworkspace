import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevdacticLibComponent } from './devdactic-lib.component';

describe('DevdacticLibComponent', () => {
  let component: DevdacticLibComponent;
  let fixture: ComponentFixture<DevdacticLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevdacticLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevdacticLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

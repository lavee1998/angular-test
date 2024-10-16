import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangTreeComponent } from './drawer.component.';

describe('HangTreeComponent', () => {
  let component: HangTreeComponent;
  let fixture: ComponentFixture<HangTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HangTreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HangTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

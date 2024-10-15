import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LengthSetterComponent } from './length-setter.component';

describe('LengthSetterComponent', () => {
  let component: LengthSetterComponent;
  let fixture: ComponentFixture<LengthSetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LengthSetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LengthSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

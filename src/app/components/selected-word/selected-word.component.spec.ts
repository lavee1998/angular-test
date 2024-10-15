import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedWordComponent } from './selected-word.component';

describe('SelectedWordComponent', () => {
  let component: SelectedWordComponent;
  let fixture: ComponentFixture<SelectedWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedWordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

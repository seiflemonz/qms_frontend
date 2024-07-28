import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadungSpinnerComponent } from './loadung-spinner.component';

describe('LoadungSpinnerComponent', () => {
  let component: LoadungSpinnerComponent;
  let fixture: ComponentFixture<LoadungSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadungSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadungSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

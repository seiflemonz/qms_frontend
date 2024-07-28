import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueAccordionComponent } from './queue-accordion.component';

describe('QueueAccordionComponent', () => {
  let component: QueueAccordionComponent;
  let fixture: ComponentFixture<QueueAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueueAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

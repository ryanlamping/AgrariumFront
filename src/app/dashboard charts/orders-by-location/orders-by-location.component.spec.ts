import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByLocationComponent } from './orders-by-location.component';

describe('OrdersByLocationComponent', () => {
  let component: OrdersByLocationComponent;
  let fixture: ComponentFixture<OrdersByLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersByLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersByLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

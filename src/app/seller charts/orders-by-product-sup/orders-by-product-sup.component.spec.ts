import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByProductSupComponent } from './orders-by-product-sup.component';

describe('OrdersByProductSupComponent', () => {
  let component: OrdersByProductSupComponent;
  let fixture: ComponentFixture<OrdersByProductSupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersByProductSupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersByProductSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

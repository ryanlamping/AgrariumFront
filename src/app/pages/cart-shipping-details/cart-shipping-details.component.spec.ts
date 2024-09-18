import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShippingDetailsComponent } from './cart-shipping-details.component';

describe('CartShippingDetailsComponent', () => {
  let component: CartShippingDetailsComponent;
  let fixture: ComponentFixture<CartShippingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartShippingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartShippingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

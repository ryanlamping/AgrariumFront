import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrderManagementComponent } from './cart-order-management.component';

describe('CartOrderManagementComponent', () => {
  let component: CartOrderManagementComponent;
  let fixture: ComponentFixture<CartOrderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartOrderManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartOrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

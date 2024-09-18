import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalOrdersSupplierComponent } from './total-orders-supplier.component';

describe('TotalOrdersSupplierComponent', () => {
  let component: TotalOrdersSupplierComponent;
  let fixture: ComponentFixture<TotalOrdersSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalOrdersSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalOrdersSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

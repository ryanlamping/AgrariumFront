import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSalesSupplierComponent } from './total-sales-supplier.component';

describe('TotalSalesSupplierComponent', () => {
  let component: TotalSalesSupplierComponent;
  let fixture: ComponentFixture<TotalSalesSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalSalesSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalSalesSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByProductSupComponent } from './sales-by-product-sup.component';

describe('SalesByProductSupComponent', () => {
  let component: SalesByProductSupComponent;
  let fixture: ComponentFixture<SalesByProductSupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesByProductSupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesByProductSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

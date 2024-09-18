import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSalesSupComponent } from './total-sales-sup.component';

describe('TotalSalesSupComponent', () => {
  let component: TotalSalesSupComponent;
  let fixture: ComponentFixture<TotalSalesSupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalSalesSupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalSalesSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

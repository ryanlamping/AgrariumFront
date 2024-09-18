import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalOrdersSupComponent } from './total-orders-sup.component';

describe('TotalOrdersSupComponent', () => {
  let component: TotalOrdersSupComponent;
  let fixture: ComponentFixture<TotalOrdersSupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalOrdersSupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalOrdersSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

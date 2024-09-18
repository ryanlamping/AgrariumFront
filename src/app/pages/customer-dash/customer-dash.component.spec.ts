import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDashComponent } from './customer-dash.component';

describe('CustomerDashComponent', () => {
  let component: CustomerDashComponent;
  let fixture: ComponentFixture<CustomerDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

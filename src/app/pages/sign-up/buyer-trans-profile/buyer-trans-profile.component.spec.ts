import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyerTransactionProfileComponent } from './buyer-trans-profile.component';

describe('UserSignUpComponent', () => {
  let component: BuyerTransactionProfileComponent;
  let fixture: ComponentFixture<BuyerTransactionProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerTransactionProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerTransactionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


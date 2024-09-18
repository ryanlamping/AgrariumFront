import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyerEmailVerificationComponent } from './buyer-email-verification.component';

describe('UserSignUpComponent', () => {
  let component: BuyerEmailVerificationComponent;
  let fixture: ComponentFixture<BuyerEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerEmailVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


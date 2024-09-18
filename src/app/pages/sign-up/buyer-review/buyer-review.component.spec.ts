import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyerReviewSubmitComponent } from './buyer-review.component';

describe('UserSignUpComponent', () => {
  let component: BuyerReviewSubmitComponent;
  let fixture: ComponentFixture<BuyerReviewSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerReviewSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerReviewSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


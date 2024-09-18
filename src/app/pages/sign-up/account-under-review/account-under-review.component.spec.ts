import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountReviewComponent } from './account-under-review.component';

describe('UserSignUpComponent', () => {
  let component: AccountReviewComponent;
  let fixture: ComponentFixture<AccountReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionProfileComponent } from './trans-profile.component';

describe('UserSignUpComponent', () => {
  let component: TransactionProfileComponent;
  let fixture: ComponentFixture<TransactionProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


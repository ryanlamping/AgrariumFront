import { TestBed } from '@angular/core/testing';

import { CartEventServiceService } from './cart-event-service.service';

describe('CartEventServiceService', () => {
  let service: CartEventServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartEventServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

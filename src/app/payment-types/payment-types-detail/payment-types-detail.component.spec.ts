import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypesDetailComponent } from './payment-types-detail.component';

describe('PaymentTypesDetailComponent', () => {
  let component: PaymentTypesDetailComponent;
  let fixture: ComponentFixture<PaymentTypesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTypesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTypesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

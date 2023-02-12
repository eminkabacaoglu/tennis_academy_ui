import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypesCreateComponent } from './payment-types-create.component';

describe('PaymentTypesCreateComponent', () => {
  let component: PaymentTypesCreateComponent;
  let fixture: ComponentFixture<PaymentTypesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTypesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTypesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

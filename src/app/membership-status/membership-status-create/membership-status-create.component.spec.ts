import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipStatusCreateComponent } from './membership-status-create.component';

describe('MembershipStatusCreateComponent', () => {
  let component: MembershipStatusCreateComponent;
  let fixture: ComponentFixture<MembershipStatusCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipStatusCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipStatusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

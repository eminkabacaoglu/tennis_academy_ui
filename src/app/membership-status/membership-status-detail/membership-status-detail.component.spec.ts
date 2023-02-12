import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipStatusDetailComponent } from './membership-status-detail.component';

describe('MembershipStatusDetailComponent', () => {
  let component: MembershipStatusDetailComponent;
  let fixture: ComponentFixture<MembershipStatusDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipStatusDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipStatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

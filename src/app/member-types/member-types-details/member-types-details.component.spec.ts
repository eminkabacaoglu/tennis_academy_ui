import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTypesDetailsComponent } from './member-types-details.component';

describe('MemberTypesDetailsComponent', () => {
  let component: MemberTypesDetailsComponent;
  let fixture: ComponentFixture<MemberTypesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTypesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberTypesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

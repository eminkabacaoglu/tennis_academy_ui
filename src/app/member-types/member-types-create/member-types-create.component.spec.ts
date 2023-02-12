import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTypesCreateComponent } from './member-types-create.component';

describe('MemberTypesCreateComponent', () => {
  let component: MemberTypesCreateComponent;
  let fixture: ComponentFixture<MemberTypesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTypesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberTypesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

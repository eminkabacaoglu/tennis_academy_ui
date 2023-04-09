import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerTypesDetailsComponent } from './locker-types-details.component';

describe('LockerTypesDetailsComponent', () => {
  let component: LockerTypesDetailsComponent;
  let fixture: ComponentFixture<LockerTypesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockerTypesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockerTypesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerTypesComponent } from './locker-types.component';

describe('LockerTypesComponent', () => {
  let component: LockerTypesComponent;
  let fixture: ComponentFixture<LockerTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockerTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockerTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

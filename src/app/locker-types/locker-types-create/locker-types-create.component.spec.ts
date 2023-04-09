import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerTypesCreateComponent } from './locker-types-create.component';

describe('LockerTypesCreateComponent', () => {
  let component: LockerTypesCreateComponent;
  let fixture: ComponentFixture<LockerTypesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockerTypesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockerTypesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

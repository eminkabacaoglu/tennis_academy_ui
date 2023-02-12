import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTypesComponent } from './employee-types.component';

describe('EmployeeTypesComponent', () => {
  let component: EmployeeTypesComponent;
  let fixture: ComponentFixture<EmployeeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

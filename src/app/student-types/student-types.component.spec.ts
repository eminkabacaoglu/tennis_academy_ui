import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTypesComponent } from './student-types.component';

describe('StudentTypesComponent', () => {
  let component: StudentTypesComponent;
  let fixture: ComponentFixture<StudentTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

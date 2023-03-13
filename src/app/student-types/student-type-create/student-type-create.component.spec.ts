import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTypeCreateComponent } from './student-type-create.component';

describe('StudentTypeCreateComponent', () => {
  let component: StudentTypeCreateComponent;
  let fixture: ComponentFixture<StudentTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTypeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

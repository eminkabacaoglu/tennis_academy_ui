import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTypeDetailsComponent } from './student-type-details.component';

describe('StudentTypeDetailsComponent', () => {
  let component: StudentTypeDetailsComponent;
  let fixture: ComponentFixture<StudentTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTypeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

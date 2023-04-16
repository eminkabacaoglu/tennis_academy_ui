import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsCreateComponent } from './fields-create.component';

describe('FieldsCreateComponent', () => {
  let component: FieldsCreateComponent;
  let fixture: ComponentFixture<FieldsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

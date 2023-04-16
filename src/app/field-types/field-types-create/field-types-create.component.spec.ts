import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTypesCreateComponent } from './field-types-create.component';

describe('FieldTypesCreateComponent', () => {
  let component: FieldTypesCreateComponent;
  let fixture: ComponentFixture<FieldTypesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldTypesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldTypesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

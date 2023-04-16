import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTypesDetailsComponent } from './field-types-details.component';

describe('FieldTypesDetailsComponent', () => {
  let component: FieldTypesDetailsComponent;
  let fixture: ComponentFixture<FieldTypesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldTypesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldTypesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

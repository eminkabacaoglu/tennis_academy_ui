import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTypesCreateComponent } from './module-types-create.component';

describe('ModuleTypesCreateComponent', () => {
  let component: ModuleTypesCreateComponent;
  let fixture: ComponentFixture<ModuleTypesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTypesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleTypesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

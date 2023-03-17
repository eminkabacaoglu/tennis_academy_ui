import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTypesComponent } from './module-types.component';

describe('ModuleTypesComponent', () => {
  let component: ModuleTypesComponent;
  let fixture: ComponentFixture<ModuleTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTypesDetailsComponent } from './module-types-details.component';

describe('ModuleTypesDetailsComponent', () => {
  let component: ModuleTypesDetailsComponent;
  let fixture: ComponentFixture<ModuleTypesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTypesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleTypesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

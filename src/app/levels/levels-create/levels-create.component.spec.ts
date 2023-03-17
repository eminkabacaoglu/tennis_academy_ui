import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsCreateComponent } from './levels-create.component';

describe('LevelsCreateComponent', () => {
  let component: LevelsCreateComponent;
  let fixture: ComponentFixture<LevelsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcIngredientFormComponent } from './rc-ingredient-form.component';

describe('RcIngredientFormComponent', () => {
  let component: RcIngredientFormComponent;
  let fixture: ComponentFixture<RcIngredientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcIngredientFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcIngredientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

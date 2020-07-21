import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesHomePageComponent } from './recipes-home-page.component';

describe('RecipesHomePageComponent', () => {
  let component: RecipesHomePageComponent;
  let fixture: ComponentFixture<RecipesHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

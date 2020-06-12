import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotPokemonPageComponent } from './edit-not-pokemon-page.component';

describe('EditNotPokemonPageComponent', () => {
  let component: EditNotPokemonPageComponent;
  let fixture: ComponentFixture<EditNotPokemonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNotPokemonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotPokemonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

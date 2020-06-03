import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAPokemonGeneratorPageComponent } from './not-a-pokemon-generator-page.component';

describe('NotAPokemonGeneratorPageComponent', () => {
  let component: NotAPokemonGeneratorPageComponent;
  let fixture: ComponentFixture<NotAPokemonGeneratorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAPokemonGeneratorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAPokemonGeneratorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

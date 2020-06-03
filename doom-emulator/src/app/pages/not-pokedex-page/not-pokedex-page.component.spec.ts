import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPokedexPageComponent } from './not-pokedex-page.component';

describe('NotPokedexPageComponent', () => {
  let component: NotPokedexPageComponent;
  let fixture: ComponentFixture<NotPokedexPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotPokedexPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotPokedexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

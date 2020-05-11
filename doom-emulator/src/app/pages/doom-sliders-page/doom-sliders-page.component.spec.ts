import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoomSlidersPageComponent } from './doom-sliders-page.component';

describe('DoomSlidersPageComponent', () => {
  let component: DoomSlidersPageComponent;
  let fixture: ComponentFixture<DoomSlidersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoomSlidersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoomSlidersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

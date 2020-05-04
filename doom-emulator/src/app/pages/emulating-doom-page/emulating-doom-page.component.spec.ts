import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmulatingDoomPageComponent } from './emulating-doom-page.component';

describe('EmulatingDoomPageComponent', () => {
  let component: EmulatingDoomPageComponent;
  let fixture: ComponentFixture<EmulatingDoomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmulatingDoomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmulatingDoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

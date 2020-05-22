import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotMyStarterSixPageComponent } from './not-my-starter-six-page.component';

describe('NotMyStarterSixPageComponent', () => {
  let component: NotMyStarterSixPageComponent;
  let fixture: ComponentFixture<NotMyStarterSixPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotMyStarterSixPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotMyStarterSixPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

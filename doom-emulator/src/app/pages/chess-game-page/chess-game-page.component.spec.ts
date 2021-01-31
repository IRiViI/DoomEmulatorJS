import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessGamePageComponent } from './chess-game-page.component';

describe('ChessGamePageComponent', () => {
  let component: ChessGamePageComponent;
  let fixture: ComponentFixture<ChessGamePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessGamePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

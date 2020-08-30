import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPresentationPageComponent } from './contract-presentation-page.component';

describe('ContractPresentationPageComponent', () => {
  let component: ContractPresentationPageComponent;
  let fixture: ComponentFixture<ContractPresentationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPresentationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPresentationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

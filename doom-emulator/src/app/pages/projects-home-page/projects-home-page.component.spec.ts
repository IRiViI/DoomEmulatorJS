import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsHomePageComponent } from './projects-home-page.component';

describe('ProjectsHomePageComponent', () => {
  let component: ProjectsHomePageComponent;
  let fixture: ComponentFixture<ProjectsHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

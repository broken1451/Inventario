import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosDetailsComponent } from './otros-details.component';

describe('OtrosDetailsComponent', () => {
  let component: OtrosDetailsComponent;
  let fixture: ComponentFixture<OtrosDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrosDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

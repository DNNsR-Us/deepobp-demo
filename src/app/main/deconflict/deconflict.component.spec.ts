import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeconflictComponent } from './deconflict.component';

describe('DeconflictComponent', () => {
  let component: DeconflictComponent;
  let fixture: ComponentFixture<DeconflictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeconflictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeconflictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

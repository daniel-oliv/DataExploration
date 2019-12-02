import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAgmComponent } from './map-agm.component';

describe('MapAgmComponent', () => {
  let component: MapAgmComponent;
  let fixture: ComponentFixture<MapAgmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAgmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAgmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

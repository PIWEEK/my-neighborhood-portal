import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodComponent } from './neighborhood.component';

describe('NeighborhoodComponent', () => {
  let component: NeighborhoodComponent;
  let fixture: ComponentFixture<NeighborhoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighborhoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeighborhoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

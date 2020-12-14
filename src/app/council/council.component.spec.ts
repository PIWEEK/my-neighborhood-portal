import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilComponent } from './council.component';

describe('CouncilComponent', () => {
  let component: CouncilComponent;
  let fixture: ComponentFixture<CouncilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouncilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

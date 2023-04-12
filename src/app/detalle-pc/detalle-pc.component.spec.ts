import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePcComponent } from './detalle-pc.component';

describe('DetallePcComponent', () => {
  let component: DetallePcComponent;
  let fixture: ComponentFixture<DetallePcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

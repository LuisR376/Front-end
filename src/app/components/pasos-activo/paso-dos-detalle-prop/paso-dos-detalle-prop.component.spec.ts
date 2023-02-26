import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoDosDetallePropComponent } from './paso-dos-detalle-prop.component';

describe('PasoDosDetallePropComponent', () => {
  let component: PasoDosDetallePropComponent;
  let fixture: ComponentFixture<PasoDosDetallePropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasoDosDetallePropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasoDosDetallePropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

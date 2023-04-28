import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioRASComponent } from './inventario-ras.component';

describe('InventarioRASComponent', () => {
  let component: InventarioRASComponent;
  let fixture: ComponentFixture<InventarioRASComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioRASComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioRASComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

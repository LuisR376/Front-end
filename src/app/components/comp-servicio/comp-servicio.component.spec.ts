import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompServicioComponent } from './comp-servicio.component';

describe('CompServicioComponent', () => {
  let component: CompServicioComponent;
  let fixture: ComponentFixture<CompServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

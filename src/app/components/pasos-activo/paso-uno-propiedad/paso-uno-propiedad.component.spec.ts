import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoUnoPropiedadComponent } from './paso-uno-propiedad.component';

describe('PasoUnoPropiedadComponent', () => {
  let component: PasoUnoPropiedadComponent;
  let fixture: ComponentFixture<PasoUnoPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasoUnoPropiedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasoUnoPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

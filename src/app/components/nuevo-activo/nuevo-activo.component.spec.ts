import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoActivoComponent } from './nuevo-activo.component';

describe('NuevoActivoComponent', () => {
  let component: NuevoActivoComponent;
  let fixture: ComponentFixture<NuevoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

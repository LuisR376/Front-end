import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevalicenciaComponent } from './nuevalicencia.component';

describe('NuevalicenciaComponent', () => {
  let component: NuevalicenciaComponent;
  let fixture: ComponentFixture<NuevalicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevalicenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevalicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

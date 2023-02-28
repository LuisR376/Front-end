import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso1ActivoComponent } from './paso1-activo.component';

describe('Paso1ActivoComponent', () => {
  let component: Paso1ActivoComponent;
  let fixture: ComponentFixture<Paso1ActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Paso1ActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paso1ActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

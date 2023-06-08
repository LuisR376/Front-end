import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraLoginComponent } from './contra-login.component';

describe('ContraLoginComponent', () => {
  let component: ContraLoginComponent;
  let fixture: ComponentFixture<ContraLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContraLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContraLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

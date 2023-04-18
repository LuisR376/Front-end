import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignacionByidComponent } from './reasignacion-byid.component';

describe('ReasignacionByidComponent', () => {
  let component: ReasignacionByidComponent;
  let fixture: ComponentFixture<ReasignacionByidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasignacionByidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasignacionByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

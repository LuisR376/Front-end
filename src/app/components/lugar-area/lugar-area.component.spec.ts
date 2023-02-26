import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarAreaComponent } from './lugar-area.component';

describe('LugarAreaComponent', () => {
  let component: LugarAreaComponent;
  let fixture: ComponentFixture<LugarAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LugarAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LugarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

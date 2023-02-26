import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActivosComponent } from './table-activos.component';

describe('TableActivosComponent', () => {
  let component: TableActivosComponent;
  let fixture: ComponentFixture<TableActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

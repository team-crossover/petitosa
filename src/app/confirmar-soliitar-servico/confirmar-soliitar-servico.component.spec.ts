import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarSoliitarServicoComponent } from './confirmar-soliitar-servico.component';

describe('ConfirmarSoliitarServicoComponent', () => {
  let component: ConfirmarSoliitarServicoComponent;
  let fixture: ComponentFixture<ConfirmarSoliitarServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarSoliitarServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarSoliitarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

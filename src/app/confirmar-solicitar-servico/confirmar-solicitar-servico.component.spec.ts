import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarSolicitarServicoComponent } from './confirmar-solicitar-servico.component';

describe('ConfirmarSolicitarServicoComponent', () => {
  let component: ConfirmarSolicitarServicoComponent;
  let fixture: ComponentFixture<ConfirmarSolicitarServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarSolicitarServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarSolicitarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

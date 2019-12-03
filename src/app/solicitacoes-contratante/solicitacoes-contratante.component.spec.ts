import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacoesContratanteComponent } from './solicitacoes-contratante.component';

describe('SolicitacoesContratanteComponent', () => {
  let component: SolicitacoesContratanteComponent;
  let fixture: ComponentFixture<SolicitacoesContratanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitacoesContratanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesistirSolicitacaoContratanteComponent } from './desistir-solicitacao-contratante.component';

describe('DesistirSolicitacaoContratanteComponent', () => {
  let component: DesistirSolicitacaoContratanteComponent;
  let fixture: ComponentFixture<DesistirSolicitacaoContratanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesistirSolicitacaoContratanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesistirSolicitacaoContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

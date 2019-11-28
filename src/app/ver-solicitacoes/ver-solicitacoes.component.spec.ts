import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSolicitacoesComponent } from './ver-solicitacoes.component';

describe('AnimaisComponent', () => {
  let component: VerSolicitacoesComponent;
  let fixture: ComponentFixture<VerSolicitacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerSolicitacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

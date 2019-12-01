import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAnimalSolicitacaoComponent } from './ver-animal-solicitacao.component';

describe('VerAnimalSolicitacaoComponent', () => {
  let component: VerAnimalSolicitacaoComponent;
  let fixture: ComponentFixture<VerAnimalSolicitacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAnimalSolicitacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAnimalSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

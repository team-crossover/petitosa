import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarContratanteComponent } from './cadastrar-contratante.component';

describe('CadastrarContratanteComponent', () => {
  let component: CadastrarContratanteComponent;
  let fixture: ComponentFixture<CadastrarContratanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarContratanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

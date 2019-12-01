import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoFinalizadoComponent } from './servico-finalizado.component';

describe('ServicoFinalizadoComponent', () => {
  let component: ServicoFinalizadoComponent;
  let fixture: ComponentFixture<ServicoFinalizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicoFinalizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarServicoComponent } from './solicitar-servico.component';

describe('SolicitarServicoComponent', () => {
  let component: SolicitarServicoComponent;
  let fixture: ComponentFixture<SolicitarServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

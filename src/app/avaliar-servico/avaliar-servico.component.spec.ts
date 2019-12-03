import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliarServicoComponent } from './avaliar-servico.component';

describe('AvaliarServicoComponent', () => {
  let component: AvaliarServicoComponent;
  let fixture: ComponentFixture<AvaliarServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliarServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

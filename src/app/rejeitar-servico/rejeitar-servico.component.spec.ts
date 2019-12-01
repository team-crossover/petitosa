import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeitarServicoComponent } from './rejeitar-servico.component';

describe('RejeitarServicoComponent', () => {
  let component: RejeitarServicoComponent;
  let fixture: ComponentFixture<RejeitarServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejeitarServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejeitarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

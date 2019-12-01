import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesistirServicoComponent } from './desistir-servico.component';

describe('DesistirServicoComponent', () => {
  let component: DesistirServicoComponent;
  let fixture: ComponentFixture<DesistirServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesistirServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesistirServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

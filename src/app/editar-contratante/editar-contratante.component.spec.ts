import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContratanteComponent } from './editar-contratante.component';

describe('EditarContratanteComponent', () => {
  let component: EditarContratanteComponent;
  let fixture: ComponentFixture<EditarContratanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarContratanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

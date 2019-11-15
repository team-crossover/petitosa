import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPrestadorComponent } from './cadastrar-prestador.component';

describe('CadastrarPrestadorComponent', () => {
  let component: CadastrarPrestadorComponent;
  let fixture: ComponentFixture<CadastrarPrestadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPrestadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

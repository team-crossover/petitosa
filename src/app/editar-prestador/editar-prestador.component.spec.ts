import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrestadorComponent } from './editar-prestador.component';

describe('EditarPrestadorComponent', () => {
  let component: EditarPrestadorComponent;
  let fixture: ComponentFixture<EditarPrestadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPrestadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

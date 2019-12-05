import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerContratanteComponent } from './ver-contratante.component';

describe('VerContratanteComponent', () => {
  let component: VerContratanteComponent;
  let fixture: ComponentFixture<VerContratanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerContratanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

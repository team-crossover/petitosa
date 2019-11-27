import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPrestadorComponent } from './ver-prestador.component';

describe('VerPrestadorComponent', () => {
  let component: VerPrestadorComponent;
  let fixture: ComponentFixture<VerPrestadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPrestadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

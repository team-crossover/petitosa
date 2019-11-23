import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverAnimalComponent } from './remover-animal.component';

describe('RemoverAnimalComponent', () => {
  let component: RemoverAnimalComponent;
  let fixture: ComponentFixture<RemoverAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoverAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoverAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

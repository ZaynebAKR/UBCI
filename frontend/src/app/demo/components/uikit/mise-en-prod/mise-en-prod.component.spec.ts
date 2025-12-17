import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseEnProdComponent } from './mise-en-prod.component';

describe('MiseEnProdComponent', () => {
  let component: MiseEnProdComponent;
  let fixture: ComponentFixture<MiseEnProdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiseEnProdComponent]
    });
    fixture = TestBed.createComponent(MiseEnProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

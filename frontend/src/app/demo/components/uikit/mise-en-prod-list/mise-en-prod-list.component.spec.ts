import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseEnProdListComponent } from './mise-en-prod-list.component';

describe('MiseEnProdListComponent', () => {
  let component: MiseEnProdListComponent;
  let fixture: ComponentFixture<MiseEnProdListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiseEnProdListComponent]
    });
    fixture = TestBed.createComponent(MiseEnProdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

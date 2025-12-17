import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbrGabAddComponent } from './nbr-gab-add.component';

describe('NbrGabAddComponent', () => {
  let component: NbrGabAddComponent;
  let fixture: ComponentFixture<NbrGabAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbrGabAddComponent]
    });
    fixture = TestBed.createComponent(NbrGabAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

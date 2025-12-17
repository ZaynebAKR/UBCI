import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbrGabListComponent } from './nbr-gab-list.component';

describe('NbrGabListComponent', () => {
  let component: NbrGabListComponent;
  let fixture: ComponentFixture<NbrGabListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbrGabListComponent]
    });
    fixture = TestBed.createComponent(NbrGabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

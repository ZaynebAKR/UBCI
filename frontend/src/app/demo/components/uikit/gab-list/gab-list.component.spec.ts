import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GabListComponent } from './gab-list.component';

describe('GabListComponent', () => {
  let component: GabListComponent;
  let fixture: ComponentFixture<GabListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GabListComponent]
    });
    fixture = TestBed.createComponent(GabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

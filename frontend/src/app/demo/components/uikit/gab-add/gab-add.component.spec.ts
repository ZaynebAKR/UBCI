import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GabAddComponent } from './gab-add.component';

describe('GabAddComponent', () => {
  let component: GabAddComponent;
  let fixture: ComponentFixture<GabAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GabAddComponent]
    });
    fixture = TestBed.createComponent(GabAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

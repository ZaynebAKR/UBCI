import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeListComponent } from './probleme-list.component';

describe('ProblemeListComponent', () => {
  let component: ProblemeListComponent;
  let fixture: ComponentFixture<ProblemeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemeListComponent]
    });
    fixture = TestBed.createComponent(ProblemeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderListComponent } from './gender-list.component';

describe('GenderListComponent', () => {
  let component: GenderListComponent;
  let fixture: ComponentFixture<GenderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenderListComponent]
    });
    fixture = TestBed.createComponent(GenderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

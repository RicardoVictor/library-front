import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorFilterComponent } from './author-filter.component';

describe('AuthorFilterComponent', () => {
  let component: AuthorFilterComponent;
  let fixture: ComponentFixture<AuthorFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorFilterComponent]
    });
    fixture = TestBed.createComponent(AuthorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

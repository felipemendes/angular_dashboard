import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalePlaceComponent } from './list-sale-place.component';

describe('ListSalePlaceComponent', () => {
  let component: ListSalePlaceComponent;
  let fixture: ComponentFixture<ListSalePlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSalePlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalePlaceComponent } from './add-sale-place.component';

describe('AddSalePlaceComponent', () => {
  let component: AddSalePlaceComponent;
  let fixture: ComponentFixture<AddSalePlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalePlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

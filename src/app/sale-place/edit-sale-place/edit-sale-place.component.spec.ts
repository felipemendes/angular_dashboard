import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalePlaceComponent } from './edit-sale-place.component';

describe('EditSalePlaceComponent', () => {
  let component: EditSalePlaceComponent;
  let fixture: ComponentFixture<EditSalePlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalePlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookingPocComponent } from './update-booking-poc.component';

describe('UpdateBookingPocComponent', () => {
  let component: UpdateBookingPocComponent;
  let fixture: ComponentFixture<UpdateBookingPocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBookingPocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBookingPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

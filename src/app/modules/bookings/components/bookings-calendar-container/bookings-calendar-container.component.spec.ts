import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsCalendarContainerComponent } from './bookings-calendar-container.component';

describe('CalendarContainerComponent', () => {
  let component: BookingsCalendarContainerComponent;
  let fixture: ComponentFixture<BookingsCalendarContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingsCalendarContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsCalendarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsCalendarHeaderComponent } from './bookings-calendar-header.component';

describe('HeaderComponent', () => {
  let component: BookingsCalendarHeaderComponent;
  let fixture: ComponentFixture<BookingsCalendarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingsCalendarHeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsCalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

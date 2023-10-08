import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @ViewChild('daysTag', { static: true }) daysTag!: ElementRef;
  @ViewChild('currentDate', { static: true }) currentDate!: ElementRef;

  date = new Date();
  currYear = this.date.getFullYear();
  currMonth = this.date.getMonth();

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  daysInMonth: number[] = [];

  currentMonthName: string = '';

  ngOnInit(): void {
    this.renderCalendar();
  }

  renderCalendar(): void {
    const firstDayOfMonth = new Date(this.currYear, this.currMonth, 1).getDay();
    const lastDateOfMonth = new Date(
      this.currYear,
      this.currMonth + 1,
      0
    ).getDate();
    const lastDayOfMonth = new Date(
      this.currYear,
      this.currMonth,
      lastDateOfMonth
    ).getDay();
    const lastDateOfLastMonth = new Date(
      this.currYear,
      this.currMonth,
      0
    ).getDate();

    this.daysInMonth = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      this.daysInMonth.push(lastDateOfLastMonth - i + 1);
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      this.daysInMonth.push(i);
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      this.daysInMonth.push(i - lastDayOfMonth + 1);
    }

    this.currentMonthName = this.months[this.currMonth];
    this.currentDate.nativeElement.innerText = `${this.currentMonthName} ${this.currYear}`;
  }
}

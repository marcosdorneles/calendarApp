import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reminder } from 'src/app/interfaces/reminder';
import { ReminderServiceService } from 'src/app/services/reminder.service';

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
  isClicked = false;
  reminderForm: FormGroup;
  isEditingReminder = false;
  months: string[] = ['January','February','March','April','May','June','July','August','September',
    'October','November','December',
  ];

  daysInMonth: number[] = [];

  currentMonthName: string = '';

  ngOnInit(): void {
    this.renderCalendar();
  }

  constructor(
    private fb: FormBuilder,
    public reminderService: ReminderServiceService
  ) {
    this.reminderForm = this.fb.group({
      description: [''],
      date: [''],
    });
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

  openReminderForm(date: Date) {
    const existingReminder = this.reminderService.getReminderByDate(date);
    if (existingReminder) {
      this.isEditingReminder = true;
      this.reminderForm.setValue({
        description: existingReminder.description,
        date: existingReminder.date,
      });
    } else {
      this.isEditingReminder = false;
      this.reminderForm.reset();
      this.reminderForm.patchValue({ date });
    }
    this.isClicked = true;
  }

  saveReminder() {
    const formData = this.reminderForm.value;
    if (this.isEditingReminder) {
      const existingReminder = this.reminderService.getReminderByDate(
        formData.date
      );
      if (existingReminder) {
        this.reminderService.editReminder(
          existingReminder.id,
          formData.description
        );
      }
    } else {
      const newReminder: Reminder = {
        id: Date.now(),
        description: formData.description,
        date: formData.date,
      };
      this.reminderService.createReminder(newReminder);
      console.log('um reminder foi criado com sucesso');
      console.log(newReminder);
    }
    this.isClicked = false;
  }

  clickedOnDay() {
    this.isClicked = true;
  }
  editReminder(reminder: Reminder) {
    this.isEditingReminder = true;
    this.reminderForm.setValue({
      description: reminder.description,
      date: reminder.date,
    });
    this.isClicked = true;
  }
  deleteReminder(reminder: Reminder) {
    this.reminderService.deleteReminder(reminder.id);
  }
}

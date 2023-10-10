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

  daysInMonth: Date[] = [];

  selectedDate: Date | null = null;
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
      this.daysInMonth.push(new Date(this.currYear, this.currMonth, lastDateOfLastMonth - i + 1));
    }
    
    for (let i = 1; i <= lastDateOfMonth; i++) {
      this.daysInMonth.push(new Date(this.currYear, this.currMonth, i));
    }
    
    for (let i = lastDayOfMonth; i < 6; i++) {
      this.daysInMonth.push(new Date(this.currYear, this.currMonth, i - lastDayOfMonth + 1));
    }
    

    this.currentMonthName = this.months[this.currMonth];
    this.currentDate.nativeElement.innerText = `${this.currentMonthName} ${this.currYear}`;
  }

  openReminderForm() {
    const existingReminder = this.reminderService.getReminderByDate(this.selectedDate!);
    if (existingReminder) {
      this.isEditingReminder = true;
      this.reminderForm.setValue({
        description: existingReminder.description,
        date: existingReminder.date,
      });
    } else {
      this.isEditingReminder = false;
      this.reminderForm.reset();
      this.reminderForm.patchValue({ date: this.selectedDate });
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
      console.log(`Um novo reminder foi criado com sucesso! ${newReminder}`);

    }
    this.isClicked = false;
  }

  clickedOnDay(number: Date) {
    this.selectedDate = number
    this.reminderForm.setValue({
      description:"",
      date: number
    })
    this.isClicked = true
  }
  
  editReminder(reminder: Reminder, date: Date) {
    this.isEditingReminder = true;
    this.reminderForm.setValue({
      description: reminder.description,
      date: date,
    });
    this.isClicked = true;
  }
  
  deleteReminder(reminder: Reminder) {
    this.reminderService.deleteReminder(reminder.id);
  }
  calculateDate(day: number): Date {
    return new Date(this.currYear, this.currMonth, day);
  }
  filteredReminders(): Reminder[] {
    if (this.selectedDate) {
      return this.reminderService.getReminders().filter((reminder) =>
        reminder.date.toDateString() === this.selectedDate!.toDateString()
      );
    }
    return [];
  }
  
}

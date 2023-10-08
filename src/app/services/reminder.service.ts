import { Injectable } from '@angular/core';
import { Reminder } from '../interfaces/reminder';

@Injectable({
  providedIn: 'root',
})
export class ReminderServiceService {
  constructor() {}
  private reminders: Reminder[] = [];
  isModalOpen = false;
  modalTitle = '';
  modalReminder: Reminder = { id: 0, description: '', date: new Date() };

  createReminder(reminder: Reminder) {
    this.reminders.push(reminder);
    this.saveRemindersToLocalStorage();
  }

  editReminder(id: number, newDescription: string) {
    const reminder = this.reminders.find((r) => r.id === id);
    if (reminder) {
      reminder.description = newDescription;
      this.saveRemindersToLocalStorage();
    }
  }

  deleteReminder(id: number) {
    const index = this.reminders.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.reminders.splice(index, 1);
      this.saveRemindersToLocalStorage();
    }
  }

  getReminders(): Reminder[] {
    return this.reminders;
  }

  getReminderByDate(date: Date): Reminder | undefined {
    return this.reminders.find((r) => r.date.getTime() === date.getTime());
  }

  public saveRemindersToLocalStorage() {
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }

  public loadRemindersFromLocalStorage() {
    const remindersData = localStorage.getItem('reminders');
    if (remindersData) {
      this.reminders = JSON.parse(remindersData);
    }
  }
}

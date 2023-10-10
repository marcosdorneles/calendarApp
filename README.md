# Angular Calendar Application

This is a demo calendar application built using Angular. The application allows users to create and manage reminders for specific dates and times, providing a month view of the calendar. It was developed as part of a coding challenge for a developer position at KEEPS.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Improvements](#improvements)


## Features

- Render a single month view of the calendar for the current month.
- Ability to add a new "reminder" (max 30 chars) for a user-entered day and time.
- Display reminders on the calendar view in the correct time order.
- Allow the user to select a color when creating a reminder and display it appropriately.
- Properly handle overflow when multiple reminders appear on the same date.
- Ability to edit reminders, including changing text, day and time, and color.
- Ability to delete reminders.
- Expand the calendar to support more than the current month.

## Demo

You can see a live demo of the application [here](link-to-your-live-demo).

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.

```bash
git clone https://github.com/your-username/angular-calendar-app.git
```

2. Install the project dependencies.
```bash
cd angular-calendar-app
npm install
```
3. Start the development
```bash
ng serve
```
4. Open your web browser and navigate to `http://localhost:4200/` to view the application.

## Usage

1.Open the calendar application.
2.Click on a specific date to add a new reminder.
3.Provide a reminder text (up to 30 characters), select a day and time.
4.Click "Save" to add the reminder to the calendar.
5.Reminders will be displayed when clicked on the day it was saved.
6.To edit or delete a reminder, click on the day that the reminder was created and then click on the trash bin.
7.To expand the calendar to a different month, navigate to the desired month/year.

## Improvements

Here are some areas where the project could be improved:

1.Implement user authentication to provide individual calendars and data persistence.
2.Add the ability to set reminders for recurring events (e.g., weekly meetings).
3.Enhance the user experience by providing drag-and-drop functionality for reminder placement on the calendar.
4.Improve the UI and styling for a more polished look.
5.Implement unit and integration testing to ensure the reliability of the application.



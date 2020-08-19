# Features

## Rescue password

**FR**

- the user must be able to recover the password informing his email;
- the user must receive an email with instructions to recover the password;
- the user must be able to reset the password;

**NFR**

- use mailtrap in dev environment;
- use Amazon SES in a production environment;
- sending email should happen in the background jab;

**BR**

- the link sending by email to reset the password must expire in 2 hours;
- the user needs to confirm the new password when resetting;

## Profile Update

**FR**

- the user must be able to update his name, email and password;

**BR**

- the user cannot change his email to an already used one;
- to update password user must enter the old password;
- to update password user must confirm the new password;

## Owner Dashboard

**FR**

- the user must be able to list their schedules for a specific day;
- the provider must receive a notification whenever there is a new appointment;
- the provider must be able to view unread notifications;

**NFR**

- provider schedules should be cached;
- Service provider notifications must be stored in MongoDB;
- Service provider notifications must be sent in real time using socket.io;

**BR**

- the notification must have read or unread status so that the provider can control

## Services Apponitment

**FR**

- the user must list all registered service providers;
- the user must be able to list the days of a month with at least one available time from a provider;
- the user must be able to list the available hours of a provider;
- the user must be able to make a new appointment with a provider;

**NFR**

- The list of providers must be cached;

**BR**

- each appointment must last exactly 1 hour;
- Appointments must be available between 8 am and 6 pm (first at 8 am, last at 5 pm);
- the user cannot schedule at a busy time;
- the user cannot schedule at a time already passed;
- the user cannot schedule a service with himself;

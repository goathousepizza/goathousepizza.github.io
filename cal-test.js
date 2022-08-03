require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = 3000;

const SCOPES = 'https://www.googleapis.com/auth/calendar';
const { jwt } = process.env;
const gapi = JSON.parse(jwt);
const GOOGLE_PRIVATE_KEY = gapi.private_key;
const GOOGLE_CLIENT_EMAIL = gapi.client_email;
const GOOGLE_PROJECT_NUMBER = "668492908459";
const GOOGLE_CALENDAR_ID = "prattnj@gmail.com";
const event = {
    'summary': 'This is the event',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'Customer\'s order will go here',
    'start': {
        'dateTime': '2022-08-02T20:00:00-07:00',
        'timeZone': 'America/Phoenix'
    },
    'end': {
        'dateTime': '2022-08-02T20:15:00-07:00',
        'timeZone': 'America/Phoenix'
    }
};

app.get('/', (req, res) => {

    const jwtClient = new google.auth.JWT(
        GOOGLE_CLIENT_EMAIL,
        null,
        GOOGLE_PRIVATE_KEY,
        SCOPES
    );

    const calendar = google.calendar({
        version: 'v3',
        project: GOOGLE_PROJECT_NUMBER,
        auth: jwtClient
    });

    calendar.events.insert({
        'calendarId': GOOGLE_CALENDAR_ID,
        'resource': event
    });

    calendar.events.list({
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (error, result) => {
        if (error) {
            res.send(JSON.stringify({ error: error }));
        } else {
            if (result.data.items.length) {
                res.send(JSON.stringify({ events: result.data.items }));
            } else {
                res.send(JSON.stringify({ message: 'No upcoming events found.' }));
            }
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
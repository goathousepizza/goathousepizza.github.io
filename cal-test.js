require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = 3000;

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const { gapitest } = process.env;
const test = JSON.parse(gapitest);
const GOOGLE_PRIVATE_KEY = test.private_key;
const GOOGLE_CLIENT_EMAIL = "ghp-service@goathousepizza.iam.gserviceaccount.com";
const GOOGLE_PROJECT_NUMBER = "668492908459";
const GOOGLE_CALENDAR_ID = "prattnj@gmail.com";

console.log(GOOGLE_PRIVATE_KEY);

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
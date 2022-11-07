require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', function (req, res) {
  let timeUTC = new Date().toUTCString();
  let timeUnix = new Date() - new Date('1970-01-01');
  res.json({ unix: timeUnix, utc: timeUTC });
});

app.get('/api/:date', function (req, res) {
  const dateParam = req.params.date;
  if (new Date(parseInt(dateParam)) != 'Invalid Date') {
    let timeUTC = new Date(parseInt(dateParam)).toUTCString();
    let timeUnix = new Date(String(dateParam));
    console.log(timeUnix);
    if (timeUnix != 'Invalid Date') {
      timeUnix = new Date(String(dateParam)) - new Date('1970-01-01');
      timeUTC = new Date(String(dateParam)).toUTCString();
    } else {
      timeUnix = dateParam;
    }
    res.json({ unix: parseInt(timeUnix), utc: timeUTC });
  } else {
    res.json({ error: 'Invalid Date' });
  }
});

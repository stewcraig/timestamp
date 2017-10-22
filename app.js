const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:date', (req, res) => {
  const inputDate = req.params.date;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let naturalDate = null;
  let resDate = {};
  // Convert date to integer if date is a number
  // required for parsing unix date to Date constructor
  const date = isNaN(inputDate) ? new Date(inputDate) : new Date(parseInt(inputDate, 10));
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  naturalDate = date.getTime() ?
    `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    : null;

  resDate = {
    unix: date.getTime(),
    natural: naturalDate,
  };

  res.end(JSON.stringify(resDate,null,2));
});

app.listen(process.env.PORT || port);

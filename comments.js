// Create web server to handle comments
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }
    res.send(data);
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        res.status(500).send('Internal server error');
        return;
      }
      res.send('Comment added');
    });
  });
});

app.listen(port, () => console.log(`Comments app listening on port ${port}!`));
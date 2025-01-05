const express = require('express');
const app = express();

app.use(express.json({ limit: '50mb', type: '*/*' })); // Use a middleware to parse JSON

app.post('/users', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
  }

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  console.log('Creating user:', req.body);
  res.status(201).send(req.body);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
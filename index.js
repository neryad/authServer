const express = require('express');
const cors = require('cors');

//** Create server
const app = express();

//** Cors
app.use(cors());

//** Read & Parse from body
app.use(express.json());

//** Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(4000, () => {
  console.log(`Server online on port ${4000}`);
});

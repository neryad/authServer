const express = require('express');
const cors = require('cors');
require('dotenv').config();

//** Create server
const app = express();

//* Public directory
app.use(express.static('public'));

//** Cors
app.use(cors());

//** Read & Parse from body
app.use(express.json());

//** Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`Server online on port ${process.env.PORT}`);
});

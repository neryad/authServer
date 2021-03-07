const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//** Create server
const app = express();

//* Db conection

dbConnection();

//* Public directory
app.use(express.static('public'));

//** Cors
app.use(cors());

//** Read & Parse from body
app.use(express.json());

//** Routes
app.use('/api/auth', require('./routes/auth'));

//* others routes
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public/index.html'));
// });

app.listen(process.env.PORT, () => {
  console.log(`Server online on port ${process.env.PORT}`);
});

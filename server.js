const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users/me', require('./routes/users'));
app.use('/api/admin/users', require('./routes/adminUsers'));
app.listen(process.env.PORT, () =>
  console.log(` Server chạy tại http://localhost:${process.env.PORT}`)
);
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', searchRoutes);

const PORT = process.env.PORT || 4006;
app.listen(PORT, () => {
  console.log(`Search Service running on port ${PORT}`);
});

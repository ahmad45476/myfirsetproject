require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const artworkRoutes = require('./routes/artworkRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // الاتصال بقاعدة البيانات

app.use('/api/artworks', artworkRoutes); // تغيير المسار

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log(`Artwork Service running on port ${PORT}`));

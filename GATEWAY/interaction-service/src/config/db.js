// interaction-service/src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_INTERACTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Interaction DB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
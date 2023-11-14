const mongoose = require('mongoose');


const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URL
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
  }
};

module.exports = connectDb;
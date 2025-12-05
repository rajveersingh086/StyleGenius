//mongodb+srv://rajveer227817_db_user:rajveer8748@cluster0.apwi2so.mongodb.net/
// password : rajveer8748

/*const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_CONN;

mongoose.connect(connect_url)
.then(() => {
    console.log('MongoDB Connected...');
}).catch((err) => {
    console.log('Mongo connection Error: ', err);
})*/
// Models/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri =
    process.env.MONGO_CONN ||
    process.env.MONGO_URI ||
    'mongodb://127.0.0.1:27017/mydb';

  try {
    await mongoose.connect(uri);

    console.log('📌 MongoDB Connected Successfully');
    return mongoose;
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    throw err; // Let index.js handle the failure
  }
};

module.exports = connectDB;

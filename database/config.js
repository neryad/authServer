const mongoose = ({ Mongoose } = require('mongoose'));

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('Database online');
  } catch (error) {
    console.log(error);
    throw new Error('Error on connected to DB');
  }
};

module.exports = {
  dbConnection,
};

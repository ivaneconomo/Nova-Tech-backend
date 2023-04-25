const mongoose = require('mongoose');

const dbConnection = async()=>{
  try {
    await mongoose.connect(process.env.DBURL);
    console.log('conexion exitosa');
  } catch (error) {
    console.log(error);
  }
};

dbConnection();
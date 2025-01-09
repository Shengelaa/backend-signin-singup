const { default: mongoose } = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect('mongodb+srv://shengela:shengela@web-10.1dvbx.mongodb.net/?retryWrites=true&w=majority&appName=web-10');
    console.log('connected siccessfully')
  } catch (error) {
    console.log(error, "cannot connected db");
  }
};

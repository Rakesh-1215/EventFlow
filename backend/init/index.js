const mongoose = require("mongoose");
const Event = require("../module/event.js");
const initData = require("./data.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/eventApp";

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
  await Event.deleteMany({});
  await Event.insertMany(initData.data);
  console.log("sample data is inserted");
};

initDB();
import { NextRequest, NextResponse } from "next/server";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

export async function POST(req) {
  try {
    await mongoose
      // .connect(`mongodb://${process.env.DB_URL}`)
      //   .connect(`mongodb://localhost:27017/myecommerce`)
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log("Connected to db"))
      .catch((error) => console.error("MongoDb " + error));

    let productSchema = new mongoose.Schema({
      email: String,
      date: String,
      id: Number,
      title: String,
      price: Number,
      description: String,
      category: String,
      image: String,
      rating: { rate: Number, count: Number },
    });

    // Model
    let usermodel =
      mongoose.models.orders || mongoose.model("orders", productSchema);

    //db
    let db = mongoose.connection;

    const date = new Date();
    const {
      email,
      // date,
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    } = await req.json();
    // console.log(
    //   email,
    //   date,
    //   id,
    //   title,
    //   price,
    //   description,
    //   category,
    //   image,
    //   rating
    // );

    let myData = new usermodel({
      email,
      date,
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    });
    db.collection("orders")
      .insertOne(myData)
      .then(() => {
        return NextResponse.json({ message: "Success" });
      })
      .catch((error) => {
        console.log("not done");
        return NextResponse.json({ error: error });
      });
    return NextResponse.json({ message: "Hello" });

    // let myData = new usermodel({ name, email, password, contact, isAdmin });
    // db.collection("users")
    //   .insertOne(myData)
    //   .then(() => {
    //     return NextResponse.json({ message: "Success" });
    //   })
    //   .catch((error) => {
    //     console.log("not done");
    //     return NextResponse.json({ error: error });
    //   });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

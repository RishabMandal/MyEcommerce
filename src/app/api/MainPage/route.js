// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

// console.log(process.env.MONGO_URL);
mongoose
  // .connect(`mongodb://${process.env.DB_URL}`)
  //   .connect(`mongodb://localhost:27017/myecommerce`)
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to db"))
  .catch((error) => console.error("MongoDb " + error));

// Schema
// let todoschema = new mongoose.Schema({
//   topic: String,
//   description: String,
//   time: String,
//   completed: Boolean,
// });
let productschema = new mongoose.Schema({
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
  mongoose.models.availableproducts ||
  mongoose.model("availableproducts", productschema);

//db
let db = mongoose.connection;

export async function GET() {
  try {
    const data = await db.collection("availableproducts").find().toArray();
    // console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error for get",
      message: error,
    });
  }
}

export async function POST(req) {
  try {
    const { id, title, price, description, category, image, rating } =
      await req.json();
    console.log(id, title, price, description, category, image, rating);
    let myData = new usermodel({
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    });
    // myData
    //   .save()
    //   .then(() => {
    //     // console.log("done");
    //   })
    //   .catch(() => {
    //     // console.log("not done");
    //   });
    db.collection("availableproducts")
      .insertOne(myData)
      .then(() => {
        return NextResponse.json({ message: "Success" });
      })
      .catch((error) => {
        console.log("not done");
        return NextResponse.json({ error: error });
      });
    return NextResponse.json({ message: "Hello" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
      message: error,
    });
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

// console.log(process.env.MONGO_URL);

// export async function GET(req, res) {
//   try {
//     await mongoose
//       // .connect(`mongodb://${process.env.DB_URL}`)
//       //   .connect(`mongodb://localhost:27017/myecommerce`)
//       .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then(console.log("Connected to db"))
//       .catch((error) => console.error("MongoDb " + error));

//     //db
//     let db = mongoose.connection;
//     // console.log(req);
//     // const { email } = await req.query;
//     // const email = "rishab829@gmail.com";
//     console.log(req.query);
//     // console.log(email);
//     const ids = await db.collection("cart").find({ email: email }).toArray();
//     // console.log(ids);
//     let data = [];
//     const promises = ids.map(async (product) => {
//       const productData = await db
//         .collection("availableproducts")
//         .findOne({ id: product.id });
//       data.push(productData);
//       //   console.log(productData);
//     });
//     await Promise.all(promises);
//     // console.log(data);
//     return NextResponse.json(data);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({
//       error: "Internal server error for get",
//       message: error,
//     });
//   }
// }

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

    // Schema
    // let todoschema = new mongoose.Schema({
    //   topic: String,
    //   description: String,
    //   time: String,
    //   completed: Boolean,
    // });
    let productschema = new mongoose.Schema({
      email: String,
      id: Number,
      date: String,
      title: String,
      price: Number,
      description: String,
      category: String,
      image: String,
      rating: { rate: Number, count: Number },
    });

    // Model
    let usermodel =
      mongoose.models.cart || mongoose.model("cart", productschema);

    //db
    let db = mongoose.connection;

    const {
      operation,
      email,
      id,
      date,
      title,
      price,
      description,
      category,
      image,
      rating,
      operation2,
    } = await req.json();
    // console.log(id, title, price, description, category, image, rating);
    if (operation == "get") {
      const ids = await db.collection("cart").find({ email: email }).toArray();
      // console.log(ids);
      let data = [];
      const promises = ids.map(async (product) => {
        const productData = await db
          .collection("availableproducts")
          .findOne({ id: product.id });
        data.push(productData);
        //   console.log(productData);
      });
      await Promise.all(promises);
      // console.log(data);
      return NextResponse.json(data);
    }
    if (operation == "post" && operation2 == "add") {
      let myData = new usermodel({
        email,
        date,
        id,
      });
      db.collection("cart")
        .insertOne(myData)
        .then(() => {
          return NextResponse.json({ message: "Success" });
        })
        .catch((error) => {
          console.log("not done");
          return NextResponse.json({ error: error });
        });
    }
    if (operation === "post" && operation2 === "delete") {
      db.collection("cart")
        .findOneAndDelete({ id: id })
        .then(() => {
          return NextResponse.json({ message: "Success" });
        })
        .catch((error) => {
          console.log("not done");
          return NextResponse.json({ error: error });
        });
    }
    return NextResponse.json({ message: "Hello" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
      message: error,
    });
  }
}

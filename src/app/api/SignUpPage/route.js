import { NextRequest, NextResponse } from "next/server";
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config({ path: "../.env" });

mongoose
  //   .connect(`mongodb://${process.env.DB_URL}`)
  .connect(`mongodb://localhost:27017/myecommerce`)
  .then(console.log("Connected to db"))
  .catch((error) => console.error("MongoDb " + error));

let signupschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  contact: Number,
  isAdmin: Boolean,
});

// Model
let usermodel = mongoose.models.users || mongoose.model("users", signupschema);

//db
let db = mongoose.connection;

export async function POST(req) {
  try {
    const { name, email, password, contact, isAdmin } = await req.json();

    let myData = new usermodel({ name, email, password, contact, isAdmin });
    db.collection("users")
      .insertOne(myData)
      .then(() => {
        return NextResponse.json({ message: "Success" });
      })
      .catch((error) => {
        console.log("not done");
        return NextResponse.json({ error: error });
      });
    // console.log("Found data:", data);
    return NextResponse.json("Ok");
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

// export async function POST(req) {
//   try {
//     const {
//       operation,
//       id,
//       title,
//       price,
//       description,
//       category,
//       image,
//       rating,
//     } = await req.json();
//     console.log(
//       operation,
//       id,
//       title,
//       price,
//       description,
//       category,
//       image,
//       rating
//     );
//     if (operation === "add") {
//       let myData = new usermodel({
//         id,
//         title,
//         price,
//         description,
//         category,
//         image,
//         rating,
//       });
//       db.collection("availableproducts")
//         .insertOne(myData)
//         .then(() => {
//           return NextResponse.json({ message: "Success" });
//         })
//         .catch((error) => {
//           console.log("not done");
//           return NextResponse.json({ error: error });
//         });
//       return NextResponse.json({ message: "Hello" });
//     } else if (operation === "delete") {
//       console.log("delete operation started");
//       db.collection("availableproducts")
//         .deleteOne({ id: id })
//         .then(() => {
//           return NextResponse.json({ message: "Success" });
//         })
//         .catch((error) => {
//           console.log("not done");
//           return NextResponse.json({ error: error });
//         });
//       return NextResponse.json({ message: "Hello" });
//     }
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Internal server error" });
//   }
// }

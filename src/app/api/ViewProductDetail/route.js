import { NextRequest, NextResponse } from "next/server";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

export async function POST(req) {
  try {
    mongoose
      // .connect(`mongodb://${process.env.DB_URL}`)
      //   .connect(`mongodb://localhost:27017/myecommerce`)
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log("Connected to db"))
      .catch((error) => console.error("MongoDb " + error));

    //db
    let db = mongoose.connection;

    const { id } = await req.json();
    const numericId = parseInt(id);
    // console.log("Extracted id:", id);
    const data = await db
      .collection("availableproducts")
      .find({ id: numericId })
      .toArray();
    // console.log("Found data:", data);
    return NextResponse.json(data);
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

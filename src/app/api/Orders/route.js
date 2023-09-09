import { NextRequest, NextResponse } from "next/server";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

mongoose
  // .connect(`mongodb://${process.env.DB_URL}`)
  //   .connect(`mongodb://localhost:27017/myecommerce`)
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Connected to db"))
  .catch((error) => console.error("MongoDb " + error));

//db
let db = mongoose.connection;

export async function POST(req) {
  try {
    const { email } = await req.json();
    // const numericId = parseInt(id);
    // console.log("Extracted id:", id);
    const data = await db.collection("orders").find({ email: email }).toArray();
    // console.log("Found data:", data);
    return NextResponse.json(data);
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

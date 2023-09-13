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

    let signupschema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      contact: Number,
      isAdmin: Boolean,
    });

    // Model
    let usermodel =
      mongoose.models.users || mongoose.model("users", signupschema);

    //db
    let db = mongoose.connection;

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

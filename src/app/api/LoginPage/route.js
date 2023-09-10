import { NextRequest, NextResponse } from "next/server";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

mongoose.set("strictQuery", true);
// mongoose
//   // .connect(`mongodb://${process.env.DB_URL}`)
//   //   .connect(`mongodb://localhost:27017/myecommerce`)
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//   })
//   .then(console.log("Connected to db"))
//   .catch((error) => console.error("MongoDb " + error));
let isDatabaseConnected = false;
async function connectToDatabase() {
  try {
    await mongoose.connect(`mongodb://localhost:27017/myecommerce`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // await mongoose.connect(process.env.MONGO_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    console.log("Connected to MongoDB");
    isDatabaseConnected = true; // Set the flag to true when the connection is successful
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}

connectToDatabase();

//db
let db = mongoose.connection;

// export async function GET(req) {
//   try {
//     const { email, password } = await req.json();
//     const data = await db
//       .collection("users")
//       .find({ email: email, password: password })
//       .toArray();
//     console.log("Found data:", data);
//     return NextResponse.json(data);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({
//       error: "Internal server error get error",
//       message: error.message,
//     });
//   }
// }

export async function POST(req) {
  try {
    if (!isDatabaseConnected) {
      throw new Error("Database not connected");
    }
    const { email, password } = await req.json();
    const data = await db
      .collection("users")
      .find({ email: email, password: password })
      .toArray();
    console.log("Found data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error",
      err: error,
      message: error.message,
    });
  }
}

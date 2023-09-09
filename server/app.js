const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

// My try
const cookieParser = require('cookie-parser');

const app = express();

// My try
app.use(cookieParser());

// app.use("/static", express.static("static"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use("/images", express.static(path.join(__dirname + "/images")));
app.use(
  session({
    secret: "thisisasecretkey",
    proxy: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true for HTTPS
      httpOnly: true,
      path: "/",
      maxAge: 3600000, // Session duration in milliseconds (1 hour in this example)
    },
    // username: "",
    // email: "",
    // loggedIn: false,
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
  })
);

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We are connected bro");
});

app.get("/test", (req, res) => {
  console.log(req.session);
  res.send(req.session);
});

app.post("/signup", (req, res) => {
  var mail = req.body.email;

  //   Account.find({ email: mail }, (err, docs) => {
  //     if (docs.length > 0) {
  //       //   res.render("signup.pug", { message: "Email already registered" });
  //       res.send("Email already registered");
  //     } else {
  req.session.username = req.body.name;
  req.session.email = mail;
  req.session.loggedIn = true;
  if (req.body.admin) {
    req.session.isAdmin = true;
    req.body.isAdmin = true;
  } else {
    req.session.isAdmin = false;
    req.body.isAdmin = false;
  }
  console.log(req.body);
  console.log(req.session);
  res.send(req.session);

  //   var userData = new Account(req.body);
  //   userData
  //     .save()
  //     .then(() => {
  //       res.status(200).render("index", { session: req.session });
  //     })
  //     .catch(() => {
  //       res.status(400).send("Item was not saved to the database");
  //     });
  //     }
  //   });
});

// app.post("/login", (req, res) => {
//   var email = req.body.email;
//   var password = req.body.password;

//   let view;
//   async function findAcc(email, password) {
//     view = await db
//       .collection("accounts")
//       .find({ $and: [{ email: `${email}` }, { password: `${password}` }] })
//       .toArray();
//     if (view.length > 0) {
//       req.session.username = view[0].name;
//       req.session.email = email;
//       req.session.loggedIn = true;
//       if (view[0].isAdmin == true) {
//         req.session.isAdmin = true;
//       }
//       //   res.status(200).render("index", { session: req.session });
//       res.send("valid Credentials!", { session: req.session });
//     } else res.send("Invalid Credentials!");
//   }
//   findAcc(email, password);
// });

// app.get("/logout", (req, res) => {
//   req.session.username = "";
//   req.session.email = "";
//   req.session.loggedIn = false;
//   req.session.isAdmin = false;
//   res.status(200).redirect("index");
// });


// My try
app.get('/verify-cookie', (req, res) => {
    const myCookie = req.cookies.myCookieName; // Replace with your cookie name
  
    if (myCookie) {
      // The cookie exists, you can verify its value or perform actions based on it
      res.send(`Cookie value: ${myCookie}`);
    } else {
      // The cookie doesn't exist or has an empty value
      res.send('Cookie not found');
    }
  });
//



const port = 5000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
